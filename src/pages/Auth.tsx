import AuthForm from "@/components/forms/auth";

const Auth = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-80 min-h-80 p-10  rounded shadow flex flex-col justify-center gap-4">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
