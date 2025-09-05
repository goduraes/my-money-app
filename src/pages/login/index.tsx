import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "../../components/input";

import "./styles.scss";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { confirmPassword, hasSpecialChar, minLength } from "../../utils/validate-password";

type InputsLogin = {
  email: string;
  password: string;
}

type InputsRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type InputsformResetPassword = {
  email: string;
}

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('login');

  const formLogin = useForm<InputsLogin>();
  const formRegister = useForm<InputsRegister>();
  const formResetPassword = useForm<InputsformResetPassword>();

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Insira um formato de e-mail válido.';
  }

  const onSubmitLogin: SubmitHandler<InputsLogin> = async (data) => {
    if (!auth) return;
    const { error } = await auth.login(data.email, data.password);
    if (!error) navigate('/');
  }

  const onSubmitRegister: SubmitHandler<InputsRegister> = async (data) => {
    if (!auth) return;
    const { error } = await auth.register(data.email, data.password, data.name);
    if (!error) formRegister.reset();
  }

  const onSubmitResetPassword: SubmitHandler<InputsformResetPassword> = async (data) => {
    if (!auth) return;
    const { error } = await auth.resetPassword(data.email);
    if (!error) {
      formResetPassword.reset();
      setOpen(false);
    }
  }

  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="bg-content hidden md:block col-span-8"></div>
      <div className="flex flex-col justify-center items-center p-4 col-span-12 md:col-span-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl text-gray-600 text-center mb-10">My Money</h1>

          <div className="tabs grid gap-2 grid-cols-2">
            <button
              onClick={() => setCurrentTab('login')}
              className={`p-2 cursor-pointer border-b-3 col-span-1
                ${ currentTab === 'login' ? 'text-sky-600 border-sky-600' : 'text-gray-600 border-gray-600' }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentTab('register')}
              className={`p-2 cursor-pointer border-b-3 col-span-1
                ${ currentTab === 'register' ? 'text-sky-600 border-sky-600' : 'text-gray-600 border-gray-600' }`}
            >
              Cadastro
            </button>
          </div>

          <div className="tab-content mt-4">
            <div className={`${currentTab === 'login' ? 'block' : 'hidden'}`}>
              <form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="flex flex-col gap-4">
                <Input
                  id="login-email"
                  label="E-mail"
                  type="text"
                  placeholder="fulano@email.com"
                  error={!!formLogin.formState.errors.email}
                  {...formLogin.register("email", { required: true })}
                />

                <Input
                  id="login-password"
                  label="Senha"
                  type="password"
                  error={!!formLogin.formState.errors.password}
                  {...formLogin.register("password", { required: true })}
                />

                <Button type="submit" disabled={formLogin.formState.isSubmitting} loading={formLogin.formState.isSubmitting}>
                  Entrar
                </Button>

                <button type="button" className="text-sm cursor-pointer text-sky-600 hover:underline" onClick={() => setOpen(!open)}>
                  Esqueci minha senha
                </button>
              </form>
            </div>

            <div className={`${currentTab === 'register' ? 'block' : 'hidden'}`}>
              <form onSubmit={formRegister.handleSubmit(onSubmitRegister)} className="flex flex-col gap-4">
                <Input
                  id="name"
                  label="Nome"
                  type="text"
                  placeholder="Fulano"
                  error={!!formRegister.formState.errors.name}
                  message={formRegister.formState.errors.name?.message}
                  {...formRegister.register("name", { required: true })}
                />

                <Input
                  id="email"
                  label="E-mail"
                  type="text"
                  placeholder="fulano@email.com"
                  error={!!formRegister.formState.errors.email}
                  message={formRegister.formState.errors.email?.message}
                  {...formRegister.register("email", { required: true, validate: { validateEmail } })}
                />

                <Input
                  id="password"
                  label="Senha"
                  type="password"
                  error={!!formRegister.formState.errors.password}
                  message={formRegister.formState.errors.password?.message}
                  {...formRegister.register("password", { required: true, validate: { minLength, hasSpecialChar } })}
                />

                <Input
                  id="confirmPassword"
                  label="Confirme a Senha"
                  type="password"
                  error={!!formRegister.formState.errors.confirmPassword}
                  message={formRegister.formState.errors.confirmPassword?.message}
                  {...formRegister.register("confirmPassword", { required: true, validate: {
                    validatePassword: (value) => confirmPassword(formRegister.getValues().password, value)
                  }})}
                />

                <Button type="submit" disabled={formRegister.formState.isSubmitting} loading={formRegister.formState.isSubmitting}>
                  Cadastrar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-col text-gray-600">
          <span className="text-xl pr-3">Redefinir senha</span>
          <span className="text-sm">Digite seu email para receber as instruções de redefinição de senha.</span>
        </div>

        <form onSubmit={formResetPassword.handleSubmit(onSubmitResetPassword)} className="flex flex-col gap-4 mt-4">
          <Input
            id="reset-password-email"
            label="E-mail"
            type="text"
            placeholder="fulano@email.com"
            error={!!formResetPassword.formState.errors.email}
            {...formResetPassword.register("email", { required: true })}
          />

          <Button type="submit" disabled={formResetPassword.formState.isSubmitting} loading={formResetPassword.formState.isSubmitting}>
            Enviar
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
