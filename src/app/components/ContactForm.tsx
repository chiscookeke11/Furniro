"use client";

import { useRef, useState } from "react";
import Input from "./ui/Input";
import emailjs from "@emailjs/browser";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
}

export default function ContactForm() {
  const service_id = "service_hprwj2l";
  const templateID = "template_oa5jnia";
  const publicKey = "-AXyifNYWMRF-f1jt";

  const [sending, setSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const [messageFormValues, setMessageFormValues] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessageFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  function showToast(toast: Omit<ToastProps, "id">) {
    return sonnerToast.custom((id) => (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        button={{
          label: toast.button.label,
          onClick: () => console.log("Toast button clicked"),
        }}
      />
    ));
  }

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    setSending(true);
    event.preventDefault();

    emailjs.sendForm(service_id, templateID, form.current!, publicKey).then(
      () => {
        showToast({
          title: "Success",
          description: "Your message has been sent successfully.",
          button: {
            label: "OK",
            onClick: () => console.log("OK clicked"),
          },
        });
        setSending(false);
        setMessageFormValues({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      (error) => {
        console.error(error);
        setSending(false);
        sonnerToast.error("Failed to send message.");
      }
    );
  };

  function Toast(props: ToastProps) {
    const { title, description, button, id } = props;

    return (
      <div className="flex flex-col md:flex-row gap-4 rounded-lg bg-white shadow-md ring-1 ring-gray-200 w-full max-w-sm p-4">
        <div className="flex flex-col flex-1">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <button
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
          className="self-start md:self-center mt-2 md:mt-0 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-3 py-1.5 rounded"
        >
          {button.label}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="w-full max-w-[635px] flex flex-col items-start gap-5 p-1"
    >
      <div className="w-full">
        <Input
          onChange={handleChange}
          type="text"
          placeholder="Abc"
          name="fullName"
          inputId="fullName"
          label="Your name"
          value={messageFormValues.fullName}
          errorMessage=""
          required={true}
        />
      </div>

      <div className="w-full">
        <Input
          onChange={handleChange}
          type="email"
          placeholder="Abc@def.com"
          name="email"
          inputId="email"
          label="Email address"
          value={messageFormValues.email}
          errorMessage=""
          required={true}
        />
      </div>

      <div className="w-full">
        <Input
          onChange={handleChange}
          type="text"
          placeholder="This is optional"
          name="subject"
          inputId="subject"
          label="Subject"
          value={messageFormValues.subject}
          errorMessage=""
          required={false}
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          <p className="text-base font-medium text-[#000000] ">           Message  </p>
        </label>
        <textarea
          onChange={handleChange}
          name="message"
          id="message"
          placeholder="Hi! I’d like to ask about..."
          value={messageFormValues.message}
          required
          className="w-full h-32  border-[1px] border-[#9F9F9F] focus-none rounded-[10px] px-3 py-2 font-normal text-sm md:text-base  resize-none text-[#000000]"
        />
      </div>

      <button
        type="submit"
        className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal"
      >
        {sending ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
