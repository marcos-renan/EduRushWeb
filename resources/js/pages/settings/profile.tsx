import Cropper, { type Area } from 'react-easy-crop';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Camera,
    CheckCircle2,
    Mail,
    UploadCloud,
    X,
} from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { send } from '@/routes/verification';

type StudentProfile = {
    grade_year: number;
    level: number;
    total_xp: number;
    current_streak: number;
    energy: number;
};

type SharedProps = {
    auth: {
        user: {
            name: string;
            email: string;
            username?: string | null;
            role?: string;
            profile_photo_path?: string | null;
            email_verified_at?: string | null;
        };
    };
    flash?: {
        success?: string;
        error?: string;
    };
};

export default function Profile({
    mustVerifyEmail,
    status,
    studentProfile,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    studentProfile?: StudentProfile | null;
}) {
    const page = usePage<SharedProps>();
    const user = page.props.auth.user;
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [photoStep, setPhotoStep] = useState<'pick' | 'crop'>('pick');
    const [dragging, setDragging] = useState(false);
    const [rawImage, setRawImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null,
    );
    const [photoMessage, setPhotoMessage] = useState<string | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const avatarUrl = useMemo(() => {
        if (!user.profile_photo_path) return null;
        return `/storage/${String(user.profile_photo_path).replace(/^\/+/, '')}`;
    }, [user.profile_photo_path]);

    const initials = useMemo(() => {
        const value = String(user.name || 'U').trim();
        return value.charAt(0).toUpperCase();
    }, [user.name]);

    const form = useForm({
        name: user.name ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        grade_year: String(studentProfile?.grade_year ?? 1),
    });

    const openPhotoModal = () => {
        setPhotoModalOpen(true);
        setPhotoStep('pick');
        setRawImage(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setPhotoError(null);
        setPhotoMessage(null);
    };

    const closePhotoModal = () => {
        if (uploadingPhoto) return;
        setPhotoModalOpen(false);
    };

    const handleFile = (file?: File | null) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setPhotoError('Escolha um arquivo de imagem válido.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setRawImage(String(reader.result ?? ''));
            setPhotoStep('crop');
            setPhotoError(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragging(false);
        handleFile(event.dataTransfer.files?.[0] ?? null);
    };

    const savePhoto = async () => {
        if (!rawImage || !croppedAreaPixels) return;
        setUploadingPhoto(true);
        setPhotoError(null);
        setPhotoMessage(null);

        try {
            const blob = await getCroppedBlob(rawImage, croppedAreaPixels);
            const formData = new FormData();
            formData.append('photo', blob, 'avatar.jpg');

            const csrfToken =
                document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute('content') ?? '';

            const response = await fetch('/settings/profile/photo', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: formData,
            });

            const payload = (await response.json()) as {
                message?: string;
                data?: { profile_photo_url?: string };
            };

            if (!response.ok) {
                throw new Error(
                    payload?.message ??
                        'Não foi possível atualizar a foto neste momento.',
                );
            }

            setPhotoMessage(payload.message ?? 'Foto atualizada com sucesso.');
            setAvatarVersion((value) => value + 1);
            setPhotoModalOpen(false);
            router.reload({
                only: ['auth', 'flash'],
            });
        } catch (error) {
            setPhotoError(
                error instanceof Error
                    ? error.message
                    : 'Erro inesperado ao enviar a foto.',
            );
        } finally {
            setUploadingPhoto(false);
        }
    };

    return (
        <>
            <Head title="Perfil" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 shadow-[0_12px_38px_rgba(21,101,255,0.1)] dark:border-[#263753] dark:bg-[#111C33]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                {avatarUrl ? (
                                    <img
                                        src={`${avatarUrl}?v=${avatarVersion}`}
                                        alt={user.name}
                                        className="h-20 w-20 rounded-full border-4 border-[#DCEBFF] object-cover dark:border-[#263753]"
                                    />
                                ) : (
                                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#DCEBFF] bg-[#E8F2FF] text-2xl font-black text-[#1565FF] dark:border-[#263753] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                        {initials}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={openPhotoModal}
                                    className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1565FF] text-white shadow-lg transition hover:scale-105"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>

                            <div>
                                <p className="text-2xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                    {user.name}
                                </p>
                                <p className="text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                    @{user.username ?? 'usuario'} • {user.email}
                                </p>
                                <p className="mt-1 inline-flex rounded-full bg-[#E8F2FF] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                    {user.role === 'admin' ? 'Administrador' : 'Aluno'}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={openPhotoModal}
                            className="inline-flex items-center gap-2 rounded-xl border border-[#BFE0FF] bg-[#F8FBFF] px-4 py-2 text-sm font-black text-[#1565FF] transition hover:-translate-y-0.5 dark:border-[#2B3F62] dark:bg-[#0B1428] dark:text-[#9CC0FF]"
                        >
                            <UploadCloud className="h-4 w-4" />
                            Alterar foto
                        </button>
                    </div>

                    {studentProfile ? (
                        <div className="mt-5 grid gap-2 sm:grid-cols-4">
                            <MiniStat label="Ano" value={`${studentProfile.grade_year}º`} />
                            <MiniStat label="Nível" value={`${studentProfile.level}`} />
                            <MiniStat label="XP" value={`${studentProfile.total_xp}`} />
                            <MiniStat
                                label="Sequência"
                                value={`${studentProfile.current_streak}`}
                            />
                        </div>
                    ) : null}

                    {photoMessage ? (
                        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#A6E9C8] bg-[#ECFAF3] px-3 py-2 text-sm font-semibold text-[#0A7A4F] dark:border-[#275A43] dark:bg-[#13281F] dark:text-[#9BE8C8]">
                            <CheckCircle2 className="h-4 w-4" />
                            {photoMessage}
                        </p>
                    ) : null}
                </div>

                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <h2 className="text-xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Dados da conta
                    </h2>
                    <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Atualize seus dados principais e mantenha o perfil sempre
                        completo.
                    </p>

                    <form
                        className="mt-5 space-y-4"
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.patch('/settings/profile', {
                                preserveScroll: true,
                            });
                        }}
                    >
                        <Field label="Nome" htmlFor="name">
                            <input
                                id="name"
                                name="name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                required
                            />
                            <InputError message={form.errors.name} className="mt-1" />
                        </Field>

                        <Field label="@Usuário" htmlFor="username">
                            <input
                                id="username"
                                name="username"
                                value={form.data.username}
                                onChange={(event) =>
                                    form.setData('username', event.target.value)
                                }
                                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                required
                            />
                            <InputError
                                message={form.errors.username}
                                className="mt-1"
                            />
                        </Field>

                        <Field label="E-mail" htmlFor="email">
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C7DA6] dark:text-[#8EA1C7]" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.data.email}
                                    onChange={(event) =>
                                        form.setData('email', event.target.value)
                                    }
                                    className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] pl-10 pr-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                    required
                                />
                            </div>
                            <InputError message={form.errors.email} className="mt-1" />
                        </Field>

                        {studentProfile ? (
                            <Field label="Ano escolar" htmlFor="grade_year">
                                <select
                                    id="grade_year"
                                    name="grade_year"
                                    value={form.data.grade_year}
                                    onChange={(event) =>
                                        form.setData('grade_year', event.target.value)
                                    }
                                    className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-bold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                >
                                    <option value="1">1º ano</option>
                                    <option value="2">2º ano</option>
                                    <option value="3">3º ano</option>
                                </select>
                                <InputError
                                    message={form.errors.grade_year}
                                    className="mt-1"
                                />
                            </Field>
                        ) : null}

                        {mustVerifyEmail && user.email_verified_at === null ? (
                            <div className="rounded-xl border border-[#FFD9A8] bg-[#FFF5E8] px-3 py-2 text-sm font-semibold text-[#9A6200] dark:border-[#5A4520] dark:bg-[#2B220F] dark:text-[#FFD783]">
                                Seu e-mail ainda não foi verificado.{' '}
                                <Link
                                    href={send()}
                                    as="button"
                                    className="underline underline-offset-4"
                                >
                                    Reenviar e-mail de verificação
                                </Link>
                            </div>
                        ) : null}

                        {status === 'verification-link-sent' ? (
                            <p className="rounded-xl border border-[#A6E9C8] bg-[#ECFAF3] px-3 py-2 text-sm font-semibold text-[#0A7A4F] dark:border-[#275A43] dark:bg-[#13281F] dark:text-[#9BE8C8]">
                                Um novo e-mail de verificação foi enviado.
                            </p>
                        ) : null}

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                        >
                            {form.processing ? 'Salvando...' : 'Salvar alterações'}
                        </button>
                    </form>
                </div>

                <DeleteUser />
            </section>

            {photoModalOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050C1C]/70 p-4">
                    <div className="w-full max-w-xl rounded-3xl border border-[#BFE0FF] bg-white p-5 shadow-2xl dark:border-[#263753] dark:bg-[#111C33]">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                Foto de perfil
                            </h3>
                            <button
                                type="button"
                                onClick={closePhotoModal}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#C8E0FF] text-[#5B6B93] dark:border-[#2A3B5A] dark:text-[#8EA1C7]"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {photoStep === 'pick' ? (
                            <div
                                onDragOver={(event) => {
                                    event.preventDefault();
                                    setDragging(true);
                                }}
                                onDragLeave={(event) => {
                                    event.preventDefault();
                                    setDragging(false);
                                }}
                                onDrop={handleDrop}
                                className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
                                    dragging
                                        ? 'border-[#1565FF] bg-[#E8F2FF] dark:bg-[#142645]'
                                        : 'border-[#C8E0FF] bg-[#F8FBFF] dark:border-[#2A3B5A] dark:bg-[#0B1428]'
                                }`}
                            >
                                <UploadCloud className="mx-auto h-10 w-10 text-[#1565FF]" />
                                <p className="mt-3 text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]">
                                    Arraste sua imagem aqui ou clique para escolher
                                    do computador
                                </p>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white"
                                >
                                    Escolher foto
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) =>
                                        handleFile(event.target.files?.[0] ?? null)
                                    }
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative mx-auto h-[320px] w-full max-w-[360px] overflow-hidden rounded-3xl border border-[#C8E0FF] bg-[#0B1428] dark:border-[#2A3B5A]">
                                    {rawImage ? (
                                        <Cropper
                                            image={rawImage}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
                                            cropShape="round"
                                            showGrid={false}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onCropComplete={(_, areaPixels) =>
                                                setCroppedAreaPixels(areaPixels)
                                            }
                                        />
                                    ) : null}
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                                        Zoom
                                    </p>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        step={0.01}
                                        value={zoom}
                                        onChange={(event) =>
                                            setZoom(Number(event.target.value))
                                        }
                                        className="w-full accent-[#1565FF]"
                                    />
                                </div>
                                <div className="flex flex-wrap justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPhotoStep('pick')}
                                        className="rounded-xl border border-[#C8E0FF] bg-[#F8FBFF] px-4 py-2 text-sm font-bold text-[#2F3E63] dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#B4C3E3]"
                                    >
                                        Trocar imagem
                                    </button>
                                    <button
                                        type="button"
                                        onClick={savePhoto}
                                        disabled={uploadingPhoto}
                                        className="rounded-xl bg-[#1565FF] px-4 py-2 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] disabled:opacity-60"
                                    >
                                        {uploadingPhoto
                                            ? 'Enviando...'
                                            : 'Salvar foto'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {photoError ? (
                            <p className="mt-3 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-3 py-2 text-sm font-semibold text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]">
                                {photoError}
                            </p>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
}

function Field({
    label,
    htmlFor,
    children,
}: {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
}) {
    return (
        <label htmlFor={htmlFor} className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </span>
            {children}
        </label>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-[#D9E9FF] bg-[#F8FBFF] px-3 py-2 dark:border-[#263753] dark:bg-[#0B1428]">
            <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </p>
            <p className="mt-0.5 text-base font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                {value}
            </p>
        </div>
    );
}

async function getCroppedBlob(imageSrc: string, croppedAreaPixels: Area) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Não foi possível processar a imagem.');
    }

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    context.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
    );

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((value) => resolve(value), 'image/jpeg', 0.92),
    );

    if (!blob) {
        throw new Error('Não foi possível gerar a imagem recortada.');
    }

    return blob;
}

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });
}
