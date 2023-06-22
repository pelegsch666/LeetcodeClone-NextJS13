'use client';
import { authModalState } from '@/app/atoms/authModalAtom';
import { auth, firestore } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
type SignupProps = {};

const Signup = (props: SignupProps) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState(perv => ({ ...perv, type: 'login' }));
  };
  const [inputs, setInputs] = useState({
    email: '',
    displayName: '',
    password: '',
  });
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(perv => ({ ...perv, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert('Please fill all fields');
    try {
     toast.loading('Creating Your Account',{position:'top-center' , toastId: 'loadingToast'})
     
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikeProblems: [],
        solvedProblems: [],
        starredProblems: [],

      }
      await setDoc(doc(firestore,'users',newUser.user.uid),userData)
      router.push('/');
    } catch (error: any) {
      toast.error(error.message,{position:'top-center'})
    } 
    finally{
      toast.dismiss('loadingToast')
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form
      className="space-y-6 px-6 py-4"
      onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-small font-medium block mb-2 text-gray-300">
          Email
          <input
            onChange={handleChangeInput}
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
          />
        </label>
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-small font-medium block mb-2 text-gray-300">
          Display Name
          <input
            onChange={handleChangeInput}
            type="displayName"
            name="displayName"
            id="displayName"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-500 placeholder-gray-400 text-white"
            placeholder="John Doe"
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-small font-medium block mb-2 text-gray-300">
          Password
          <input
            onChange={handleChangeInput}
            type="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-500 placeholder-gray-400 text-white"
            placeholder="********"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
        {loading ? 'Registering...' : 'Register'}
      </button>

      <div className="text-sm font-medium text-gray-300">
        Already have an account?{' '}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}>
          Log In
        </a>
      </div>
    </form>
  );
};

export default Signup;
