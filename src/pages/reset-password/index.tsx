import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/auth";
import Input from "../../components/input";
import { confirmPassword, hasSpecialChar, minLength } from "../../utils/validate-password";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

type InputsformResetPassword = {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<InputsformResetPassword>();

  const onSubmitResetPassword: SubmitHandler<InputsformResetPassword> = async (data) => {
    if (!auth) return;
    const { error } = await auth.updatePassword(data.password);
    if (!error) navigate('/');
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen p-4">
      <div className="w-full max-w-md bg-white p-6 rounded border border-gray-200 shadow-lg">
        <div className="flex flex-col text-gray-600 text-center">
          <span className="text-xl pr-6">Redefinir senha</span>
          <span className="text-sm">Digite sua nova senha abaixo</span>
        </div>

        <form onSubmit={handleSubmit(onSubmitResetPassword)} className="flex flex-col gap-4 mt-4">
          <Input
            id="password"
            label="Nova Senha"
            type="password"
            error={!!errors.password}
            message={errors.password?.message}
            {...register("password", { required: true, validate: { minLength, hasSpecialChar } })}
          />

          <Input
            id="confirmPassword"
            label="Confirme a Senha"
            type="password"
            error={!!errors.confirmPassword}
            message={errors.confirmPassword?.message}
            {...register("confirmPassword", { required: true, validate: {
              validatePassword: (value) => confirmPassword(getValues().password, value)
            }})}
          />

          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
