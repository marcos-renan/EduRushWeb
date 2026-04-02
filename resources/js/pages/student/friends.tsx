import { Head, router, usePage } from '@inertiajs/react';
import { Search, UserPlus, X } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

type FriendMember = {
    user: {
        external_id: string;
        name: string;
        username: string;
        handle: string;
        profile_photo_url?: string | null;
    };
    stats: {
        level: number;
        total_xp: number;
        current_streak: number;
    };
};

type FriendRequestItem = {
    external_id: string;
    created_at?: string | null;
    member: FriendMember;
};

type SearchResult = FriendMember & {
    is_friend: boolean;
    request_status: 'friends' | 'sent' | 'received' | 'none';
};

type Props = {
    query: string;
    friends: FriendMember[];
    requests: {
        incoming: FriendRequestItem[];
        outgoing: FriendRequestItem[];
    };
    searchResults: SearchResult[];
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
    errors?: Record<string, string>;
};

type RequestView = 'incoming' | 'outgoing' | null;

export default function StudentFriends({
    query,
    friends,
    requests,
    searchResults,
}: Props) {
    const page = usePage<SharedProps>();
    const flash = page.props.flash ?? {};
    const [searchInput, setSearchInput] = useState(query ?? '');
    const [requestView, setRequestView] = useState<RequestView>(null);
    const [friendPendingRemoval, setFriendPendingRemoval] =
        useState<FriendMember | null>(null);

    const sortedFriends = useMemo(
        () =>
            [...friends].sort((left, right) =>
                left.user.name.localeCompare(right.user.name, 'pt-BR', {
                    sensitivity: 'base',
                }),
            ),
        [friends],
    );

    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            '/student/amigos',
            { query: searchInput.trim() },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    };

    const addFriend = (username: string) => {
        router.post(
            `/student/amigos/pedidos?query=${encodeURIComponent(searchInput.trim())}`,
            { username },
            { preserveScroll: true },
        );
    };

    const acceptRequest = (requestExternalId: string) => {
        router.post(
            `/student/amigos/pedidos/${requestExternalId}/aceitar`,
            {},
            { preserveScroll: true },
        );
    };

    const rejectRequest = (requestExternalId: string) => {
        router.post(
            `/student/amigos/pedidos/${requestExternalId}/recusar`,
            {},
            { preserveScroll: true },
        );
    };

    const removeFriend = (friend: FriendMember) => {
        setFriendPendingRemoval(friend);
    };

    const confirmRemoveFriend = () => {
        if (!friendPendingRemoval) return;
        router.delete(`/student/amigos/${friendPendingRemoval.user.external_id}`, {
            preserveScroll: true,
            onFinish: () => setFriendPendingRemoval(null),
        });
    };

    return (
        <>
            <Head title="Amigos" />

            <section className="space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">
                        Social
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Amigos
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Busque por @usuário, aceite pedidos e organize sua lista de
                        amizades.
                    </p>
                </div>

                {flash.success ? (
                    <div className="rounded-2xl border border-[#8EDFBF] bg-[#E9FBF3] px-4 py-3 text-sm font-semibold text-[#0A7A4F] dark:border-[#1F6A4D] dark:bg-[#143426] dark:text-[#9BE8C8]">
                        {flash.success}
                    </div>
                ) : null}
                {flash.error ? (
                    <div className="rounded-2xl border border-[#F2BDCA] bg-[#FFEFF3] px-4 py-3 text-sm font-semibold text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]">
                        {flash.error}
                    </div>
                ) : null}

                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                    <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Buscar amigo
                    </h2>
                    <form className="mt-3 flex gap-2" onSubmit={search}>
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8EA1C7]" />
                            <input
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                                placeholder="@usuario"
                                autoCapitalize="off"
                                autoComplete="off"
                                className="h-11 w-full rounded-xl border border-[#D9E9FF] bg-[#F8FBFF] pl-10 pr-3 text-sm font-semibold text-[#1D2B4F] outline-none transition focus:border-[#1565FF] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white"
                        >
                            Buscar
                        </button>
                    </form>

                    {searchInput.trim().length >= 2 && searchResults.length === 0 ? (
                        <p className="mt-3 text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                            Nenhum usuário encontrado.
                        </p>
                    ) : null}

                    <div className="mt-3 space-y-2">
                        {searchResults.map((member) => {
                            const status = member.request_status;
                            const disabled = status === 'friends' || status === 'sent';

                            return (
                                <div
                                    key={member.user.external_id}
                                    className="flex items-center justify-between gap-3 rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <MemberIdentity member={member} />
                                    <button
                                        type="button"
                                        disabled={disabled}
                                        onClick={() => addFriend(member.user.username)}
                                        className={`inline-flex h-9 items-center gap-1 rounded-lg px-3 text-xs font-black uppercase tracking-[0.08em] ${
                                            status === 'friends'
                                                ? 'bg-[#DDE7F8] text-[#5B6B93] dark:bg-[#1D2D49] dark:text-[#8EA1C7]'
                                                : status === 'sent'
                                                  ? 'bg-[#DDE7F8] text-[#5B6B93] dark:bg-[#1D2D49] dark:text-[#8EA1C7]'
                                                  : 'bg-[#1565FF] text-white'
                                        }`}
                                    >
                                        <UserPlus className="h-3.5 w-3.5" />
                                        {status === 'friends'
                                            ? 'Amigo'
                                            : status === 'sent'
                                              ? 'Enviado'
                                              : status === 'received'
                                                ? 'Responder'
                                                : 'Adicionar'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                    <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Área de pedidos
                    </h2>
                    <div className="mt-3 flex gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setRequestView((previous) =>
                                    previous === 'incoming' ? null : 'incoming',
                                )
                            }
                            className={`rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-[0.08em] ${
                                requestView === 'incoming'
                                    ? 'border-[#1565FF] bg-[#E8F2FF] text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]'
                                    : 'border-[#D9E9FF] bg-[#F8FBFF] text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]'
                            }`}
                        >
                            Pendentes ({requests.incoming.length})
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setRequestView((previous) =>
                                    previous === 'outgoing' ? null : 'outgoing',
                                )
                            }
                            className={`rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-[0.08em] ${
                                requestView === 'outgoing'
                                    ? 'border-[#1565FF] bg-[#E8F2FF] text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]'
                                    : 'border-[#D9E9FF] bg-[#F8FBFF] text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]'
                            }`}
                        >
                            Enviados ({requests.outgoing.length})
                        </button>
                    </div>

                    {requestView === 'incoming' ? (
                        <div className="mt-3 space-y-2">
                            {requests.incoming.length === 0 ? (
                                <p className="text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                    Nenhum pedido pendente.
                                </p>
                            ) : null}

                            {requests.incoming.map((request) => (
                                <div
                                    key={request.external_id}
                                    className="flex items-center justify-between gap-3 rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <MemberIdentity member={request.member} />
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                rejectRequest(request.external_id)
                                            }
                                            className="inline-flex h-9 items-center rounded-lg border border-[#F2BDCA] bg-[#FFEFF3] px-3 text-xs font-black uppercase tracking-[0.08em] text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                                        >
                                            Recusar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                acceptRequest(request.external_id)
                                            }
                                            className="inline-flex h-9 items-center rounded-lg bg-[#1565FF] px-3 text-xs font-black uppercase tracking-[0.08em] text-white"
                                        >
                                            Aceitar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {requestView === 'outgoing' ? (
                        <div className="mt-3 space-y-2">
                            {requests.outgoing.length === 0 ? (
                                <p className="text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                    Nenhum pedido enviado.
                                </p>
                            ) : null}

                            {requests.outgoing.map((request) => (
                                <div
                                    key={request.external_id}
                                    className="flex items-center justify-between gap-3 rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <MemberIdentity member={request.member} />
                                    <span className="inline-flex h-9 items-center rounded-lg border border-[#D9E9FF] bg-white px-3 text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:border-[#2C3D5D] dark:bg-[#111C33] dark:text-[#8EA1C7]">
                                        Aguardando
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                    <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Seus amigos (A-Z)
                    </h2>
                    <div className="mt-3 space-y-2">
                        {sortedFriends.length === 0 ? (
                            <p className="text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                Você ainda não adicionou amigos.
                            </p>
                        ) : null}

                        {sortedFriends.map((friend) => (
                            <div
                                key={friend.user.external_id}
                                className="flex items-center justify-between gap-3 rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                            >
                                <MemberIdentity member={friend} />
                                <button
                                    type="button"
                                    onClick={() => removeFriend(friend)}
                                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#F2BDCA] bg-[#FFEFF3] px-3 text-xs font-black uppercase tracking-[0.08em] text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                                >
                                    <X className="h-3.5 w-3.5" />
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {friendPendingRemoval ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050C1C]/60 p-4">
                    <div className="w-full max-w-md rounded-3xl border border-[#BFE0FF] bg-white p-5 shadow-2xl dark:border-[#263753] dark:bg-[#111C33]">
                        <h3 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            Remover amizade
                        </h3>
                        <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                            Tem certeza disso? Você vai remover{' '}
                            <span className="font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                {friendPendingRemoval.user.name}
                            </span>{' '}
                            da sua lista de amigos.
                        </p>

                        <div className="mt-5 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setFriendPendingRemoval(null)}
                                className="flex-1 rounded-xl border border-[#D9E9FF] bg-[#F8FBFF] px-4 py-2.5 text-sm font-bold text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={confirmRemoveFriend}
                                className="flex-1 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-4 py-2.5 text-sm font-black text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                            >
                                Remover amigo
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

function MemberIdentity({ member }: { member: FriendMember }) {
    const initials = String(member.user.name ?? 'U').trim().charAt(0).toUpperCase();
    const photo = member.user.profile_photo_url ?? null;

    return (
        <div className="flex min-w-0 items-center gap-3">
            {photo ? (
                <img
                    src={photo}
                    alt={member.user.name}
                    className="h-10 w-10 rounded-full border border-[#BFE0FF] object-cover"
                />
            ) : (
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#BFE0FF] bg-[#E8F2FF] text-sm font-black text-[#1565FF] dark:border-[#2E4062] dark:bg-[#142645] dark:text-[#9CC0FF]">
                    {initials}
                </span>
            )}

            <div className="min-w-0">
                <p className="truncate text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                    {member.user.name}
                </p>
                <p className="truncate text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                    {member.user.handle} • Nv. {member.stats.level}
                </p>
            </div>
        </div>
    );
}
