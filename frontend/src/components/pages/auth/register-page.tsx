import Particles from 'react-particles-js';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './register-page.scoped.css';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../../store/auth';
import NormalButton from '../../utils/buttons/normal-button';
import PageWrapper from '../page-wrapper';
import Input from '../../utils/input/input';

const RegisterPage: React.FunctionComponent = () => {
  const user = useSelector((s: Store.AppState) => s.auth.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => dispatch(registerUser(data));

  return (user)
    ? <Redirect to="/channels/@me" />
    : (
      <PageWrapper>
        <div className="flex items-center justify-center absolute h-screen">
          <form className="rounded-md shadow bg-bg-primary p-8"
            onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold mb-8 text-center">Create an account</h1>

            <Input
              label="Email"
              name="email"
              register={register}
              className="mt-3" />
            <Input
              label="Username"
              name="username"
              register={register}
              className="mt-3" />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              className="mt-3" />

            <NormalButton className="bg-primary font w-full h-11 rounded-md mt-8">Register</NormalButton>
            <p className="mt-2">
              <Link to="/login">Already have an account?</Link>
            </p>
          </form>
        </div>
        <Particles width="100%" height="100%" />
      </PageWrapper>
    );
}

export default RegisterPage;