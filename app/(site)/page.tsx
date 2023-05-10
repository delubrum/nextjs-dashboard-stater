import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Auth() {
  return (
    <div 
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center
        bg-gray-100
        p-8
      "
    >
      <AuthForm />      
    </div>
  )
}