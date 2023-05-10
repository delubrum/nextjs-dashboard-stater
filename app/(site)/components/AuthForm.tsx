'use client';

import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading";

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((res) => {
        if (res?.error) {
          toast.error('Invalid credentials!');
        }
        if (res?.ok) {
          router.push('/dashboard')
        }
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((res) => {
        if (res?.error) {
          toast.error('Invalid credentials!');
        }
        if (res?.ok) {
          router.push('/dashboard')
        }
      })
      .finally(() => setLoading(false))
    }
  }  

  return ( 
    <>
      {loading && <Loading />}
      <h2 
        className="
          text-center 
          text-3xl
        "
        >
          Sign in to your account
      </h2>
        <form 
          className="mt-6 sm:mx-auto sm:w-full sm:max-w-md" 
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              disabled={loading}
              register={register}
              errors={errors}
              required
              id="name" 
              label="Name"
            />
          )}
          <Input 
            disabled={loading}
            register={register}
            errors={errors}
            required
            id="email" 
            label="Email address" 
            type="email"
          />
          <Input 
            disabled={loading}
            register={register}
            errors={errors}
            required
            id="password" 
            label="Password" 
            type="password"
          />
          <div className="mt-4">
            <Button disabled={loading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div 
          onClick={toggleVariant} 
          className="underline
            cursor-pointer
            flex 
            justify-center 
            text-sm 
            mt-6 
            text-gray-500
          "
        >
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </div>
      </>
  );
}