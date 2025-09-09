import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../ui/button";
import { AuthSchema } from "@/lib/validations";
import { FormInput } from "../form-input";
import { customToast } from "@/lib/utils";
import { useNavigate } from "react-router";
// import { useAdmin } from "@/hooks/useAdmin";

const AuthForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
  });

  // const { loginAdmin } = useAdmin();

  const handleSubmit = form.handleSubmit((data) => {
    // loginAdmin.mutate(data, {
    //   onSuccess(res) {
    //     const token = res.data?.token;
    //     if (token) {
    //       localStorage.setItem("token", res.data?.token);
    //     }

    //     customToast("SUCCESS", "Muvaffaqiyatli!");
    //     navigate("/");
    //   },
    // });
    console.log(data);
    customToast("SUCCESS", "Muvaffaqiyatli!");
    navigate("/");
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-[22px] font-semibold text-center">Tizimga kirish</h1>

      <div className="flex flex-col gap-2">
        <FormInput form={form} name="username" placeholder="username" />

        <FormInput
          form={form}
          name="password"
          placeholder="parol"
          type="password"
        />

        <Button className="rounded h-10">Kirish</Button>
      </div>
    </form>
  );
};

export default AuthForm;
