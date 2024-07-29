"use server";

import { Resend } from "resend";
import { EmailTemplate } from "./components/email-template";

interface State {
  success: boolean;
  error: string | null;
}

export const sendEmail = async (prevState: State, formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const result = await resend.emails.send({
    to: "tutoriaisdavi5@gmail.com",
    from: `${firstName} ${lastName} <onboarding@resend.dev>`,
    subject: "Novo contato",
    react: EmailTemplate({
      firstName,
      lastName,
      email,
      service,
      message,
    }),
  });

  if (!result.error) return { ...prevState, success: true };

  return {
    ...prevState,
    error: "Ocorrreu um erro ao enviar o email, tente novamente.",
  };
};
