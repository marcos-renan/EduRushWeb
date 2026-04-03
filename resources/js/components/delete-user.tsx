import { Form } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [confirmStep, setConfirmStep] = useState<'warning' | 'password'>(
        'warning',
    );

    return (
        <div className="mx-auto w-full max-w-3xl space-y-6">
            <div className="text-center">
                <Heading
                    variant="small"
                    title="Excluir conta"
                    description="Remova sua conta e todos os dados vinculados"
                />
            </div>
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 text-center dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Atenção</p>
                    <p className="text-sm">
                        Esta ação é permanente e não pode ser desfeita.
                    </p>
                </div>

                <Dialog
                    open={open}
                    onOpenChange={(next) => {
                        setOpen(next);
                        if (!next) setConfirmStep('warning');
                    }}
                >
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            data-test="delete-user-button"
                            className="mx-auto"
                            onClick={() => setConfirmStep('warning')}
                        >
                            Excluir conta
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            Tem certeza que deseja excluir sua conta?
                        </DialogTitle>

                        {confirmStep === 'warning' ? (
                            <>
                                <DialogDescription>
                                    Esta ação é permanente e não pode ser desfeita.
                                </DialogDescription>
                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">Cancelar</Button>
                                    </DialogClose>
                                    <Button
                                        variant="destructive"
                                        onClick={() => setConfirmStep('password')}
                                    >
                                        Continuar
                                    </Button>
                                </DialogFooter>
                            </>
                        ) : (
                            <>
                                <DialogDescription>
                                    Ao confirmar, todos os seus dados serão removidos
                                    permanentemente. Digite sua senha para continuar.
                                </DialogDescription>

                                <Form
                                    {...ProfileController.destroy.form()}
                                    options={{
                                        preserveScroll: true,
                                    }}
                                    onError={() => passwordInput.current?.focus()}
                                    resetOnSuccess
                                    className="space-y-6"
                                >
                                    {({ resetAndClearErrors, processing, errors }) => (
                                        <>
                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor="password"
                                                    className="sr-only"
                                                >
                                                    Senha
                                                </Label>

                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    ref={passwordInput}
                                                    placeholder="Senha"
                                                    autoComplete="current-password"
                                                />

                                                <InputError message={errors.password} />
                                            </div>

                                            <DialogFooter className="gap-2">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => {
                                                        resetAndClearErrors();
                                                        setConfirmStep('warning');
                                                    }}
                                                >
                                                    Voltar
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    disabled={processing}
                                                    asChild
                                                >
                                                    <button
                                                        type="submit"
                                                        data-test="confirm-delete-user-button"
                                                    >
                                                        Excluir conta
                                                    </button>
                                                </Button>
                                            </DialogFooter>
                                        </>
                                    )}
                                </Form>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
