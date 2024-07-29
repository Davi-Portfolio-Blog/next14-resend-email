"use client";

import { z } from "zod";
import { useEffect } from "react";
import { sendEmail } from "@/actions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import { useFormState } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Nome muito curto" }),
  lastName: z.string({ required_error: "Campo obrigatório" }).min(3, {
    message: "Sobrenome muito curto",
  }),
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  message: z.string({ required_error: "Campo obrigatório" }).min(5, {
    message: "Mensagem muito curta",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const Home = () => {
  const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
    error: null,
    success: false,
  });

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    reValidateMode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("service", data.service);
    formData.append("message", data.message);

    sendEmailAction(formData);
    reset();
  });

  useEffect(() => {
    if (sendEmailState.error) return alert(sendEmailState.error);
    if (sendEmailState.success) return alert("Email enviado com sucesso!");
  }, [sendEmailState]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-800">
      <div className="bg-gray-300 rounded-xl w-1/2 flex flex-col items-center shadow-xl p-8">
        <h1 className="text-2xl mb-6 font-bold ">
          Formulário Next + Resend + React Email
        </h1>
        <form className="w-full space-y-4" onSubmit={onSubmit}>
          <div>
            <Input
              placeholder="Nome"
              {...register("firstName")}
              className="bg-blue-400 border-none outline-none text-black"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div>
            <Input
              placeholder="Sobrenome"
              {...register("lastName")}
              className="bg-blue-400 border-none outline-none text-black"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              {...register("email")}
              className="bg-blue-400 border-none outline-none text-black"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              name="service"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Desenvolvimento</SelectLabel>
                      <SelectItem value="Sistema">Sistema</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Aplicativo">Aplicativo</SelectItem>
                      <SelectItem value="Landing Page">Landing Page</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.service && (
              <span className="text-red-500 text-sm">
                {errors.service.message}
              </span>
            )}
          </div>
          <div>
            <Textarea
              {...register("message")}
              placeholder="Deixe sua mensagem"
              className="bg-blue-400 border-none outline-none text-black"
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="bg-green-400 border-none outline-none text-black w-full text-bold text-md hover:bg-green-500 shadow-md"
          >
            Enviar
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Home;
