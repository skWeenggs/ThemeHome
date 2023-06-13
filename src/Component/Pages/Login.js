import React,{useContext,useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../Context/ThemeContext';

const Login = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
  
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required(),
        // password:Yup.string().required()
    });

    
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        const admin = sessionStorage.getItem('user');
        if (user) {
            navigate("/")
        }
        else if(admin){
            navigate("/dashboard")
        }
    }, [])
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
      } = useForm({resolver: yupResolver(validationSchema)}  );
    
    const handleData=(data)=>{
        console.log(data);
    }
  
    return (
        <>
        <div className={`py-12 sm:py-16 lg:py-20  ${theme === 'dark'?'bg-gray-800' : 'bg-white '} min-h-[calc(100vh-65px-100px)]`}>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="relative mx-auto max-w-md lg:max-w-lg">
                    <div class="absolute -inset-2">
                        <div class=" mx-auto h-full w-full rounded-3xl opacity-30 blur-lg filter"></div>
                    </div>
                    <div class={`relative overflow-hidden rounded-xl shadow-xl ${theme === 'dark'?'bg-gray-800' : 'bg-white '}`}>
                        <div className={`px-4 py-6 sm:px-8 ${theme === 'dark'?'bg-gray-700' : 'bg-white'}` }>
                            <div class={`flex items-center justify-between ${theme === 'dark' ? 'text-white ' : 'text-gray-900'}` }>
                                <h1 class="text-xl font-bold ">Login</h1>
                                <p class="text-base font-normal">
                                    Don't have an account?
                                    <Link to="/register" class="rounded font-bold hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Join now</Link>
                                </p>
                            </div>
                            <form method="post" onSubmit={handleSubmit(handleData)} class="mt-12">
                                <div class="space-y-4">
                                    <div>
                                        <label for="email" class={`text-base font-medium ${theme === 'dark'?'text-white' : 'text-gray-800'}`}>Email</label>
                                        <div class="mt-2.5 ">
                                            <input
                                                id="email"
                                                placeholder="abc@gmail.com"
                                                class={`block w-full rounded-xl border border-gray-400  px-4 py-4  placeholder-gray-600 caret-gray-900  focus:border-gray-900 focus:ring-gray-900 ${theme === 'dark'?'bg-gray-500 text-white ' : 'bg-white text-gray-900 '}`}
                                                aria-label="Email address"
                                                
                                                {...register("email", { 
                                                    required: true, 
                                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                                                  })}
                                            />
                                             {errors.email && <p className='text-red-500 mt-2'>Please enter a valid email address.</p>}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    class={`mt-5 flex w-full items-center justify-center rounded-xl border border-transparent  px-8 py-4 text-base font-bold   ${theme === 'dark'?'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 hover:text-gray-900 text-gray-500'} transition-all duration-200  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2`}
                                >
                                    Login
                                </button>
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default Login