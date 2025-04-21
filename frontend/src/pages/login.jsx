import React,{useState} from 'react';
import login_png from './../assets/login_trans-removebg-preview.svg'
import { FaEye,FaEyeSlash } from "react-icons/fa";



const Login = () => {
  const [showPassword,setShowPassword] = useState(false);
  ;
  const handleSubmit = (e) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

  
    console.log("Email:", email, "Password:", password);
 
  }
    return (
      <>
      <div className='bg-[#5FC25A] w-screen h-screen flex flex-row items-center justify-center'>
        <div className='w-[20vw] inline-flex '>
          <img src={login_png} alt="" />
        </div>
        <div>
          <form action="" onSubmit={handleSubmit} className='bg-white rounded-sm text-xs w-[20vw] text-black' >
            <h3 className='text-center text-gray-700 text-2xl font-[600] mb-10 pt-2'>Login</h3>
            <label htmlFor="email" className='ml-7 block text-xs font-[550] text-gray-700 mb-1'>Email</label>
            <input type="text" className="ml-7 pr-8 pl-2 py-1 w-[15vw] text-xs border-[0.5px] rounded-sm mb-3 focus:outline-none focus:border-gray-300" id='email' />
            <label htmlFor="password" className='ml-7 block text-xs font-[550] text-gray-700 mb-1'>Password</label>
            <div className="relative w-[15vw] ml-7">
  <input
    type={showPassword ? "text" : "password"}
    className="w-full text-xs border-[0.5px] rounded-sm focus:outline-none focus:border-gray-300 pr-8 pl-2 py-1"
    id="password"
  />
  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>
<div className="w-[15vw] ml-7">

  {/* Remember Me + Forgot Password */}
  <div className="mt-2 flex items-center justify-between text-[10px] mb-10">
    <label className="flex items-center space-x-1">
      <input
        type="checkbox"
        className="w-3 h-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
      />
      <span className="text-gray-700">Remember Me</span>
    </label>

    <a href="#" className="text-[#5FC25A] hover:underline whitespace-nowrap">
      Forgot Password?
    </a>
  </div>
</div>

<div className="mt-4 flex justify-center">
  <button
    type="submit"
    className="text-white bg-[#5FC25A] w-[80%] rounded-sm py-2"
  >
    Login
  </button>
</div>
<div className="mt-4 text-xs text-center w-[15vw] ml-7 pb-3">
  <span className="text-gray-600">Don’t have an account? </span>
  <a href="#" className="text-[#5FC25A] hover:underline">
    Sign up
  </a>
</div>


        </form>
        </div>
      </div>
      </>
    );
}

export default Login;
