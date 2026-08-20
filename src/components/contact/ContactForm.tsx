// import { useState, ChangeEvent, FormEvent, useRef } from "react";
// import { FormData } from "@/types/contact";
// import emailjs from "@emailjs/browser";
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
// import { Textarea } from "@/components/ui/textarea";
// import useContainerDimensions from "@/hooks/useContainerDimensions";
//
// const initialFormData: FormData = {
//   name: "",
//   company: "",
//   message: "",
//   email: "",
//   privacy: false,
// };
//
// interface ContactFormProps {
//   containerRef: React.RefObject<HTMLDivElement>;
// }
//
// const ContactForm = ({ containerRef }: ContactFormProps) => {
//   const [formData, setFormData] = useState<FormData>(initialFormData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const form = useRef<HTMLFormElement>(null);
//   const { toast } = useToast();
//   const dimensions = useContainerDimensions(containerRef);
//
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };
//
//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Name Required",
//         description: "Please enter your name.",
//         duration: 3000,
//       });
//       return false;
//     }
//     if (!formData.message.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Message Required",
//         description: "Please enter your message.",
//         duration: 3000,
//       });
//       return false;
//     }
//     if (!formData.email.trim()) {
//       toast({
//         variant: "destructive",
//         title: "Email Required",
//         description: "Please enter your email address.",
//         duration: 3000,
//       });
//       return false;
//     }
//     if (!formData.privacy) {
//       toast({
//         variant: "destructive",
//         title: "Privacy Policy",
//         description: "Please accept the privacy policy to continue.",
//         duration: 3000,
//       });
//       return false;
//     }
//     return true;
//   };
//
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//
//     // Validate form before attempting to submit
//     if (!validateForm()) {
//       return;
//     }
//
//     setIsSubmitting(true);
//
//     try {
//       if (form.current) {
//         const emailData = {
//           user_name: formData.name,
//           user_email: formData.email,
//           message: `${formData.company !== "" ? `Company: ${formData.company}\n\n` : ""}${formData.message}`,
//         };
//
//         await emailjs.send(
//           import.meta.env.VITE_EMAILJS_SERVICE_ID,
//           import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//           emailData,
//           import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
//         );
//
//         toast({
//           title: "Message Sent",
//           description: "Your message has been sent successfully.",
//           duration: 3000,
//         });
//
//         setFormData(initialFormData);
//       }
//     } catch (error) {
//       console.error("Failed to send message:", error);
//
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to send message. Please try again.",
//         action: <ToastAction altText="Try again">Try again</ToastAction>,
//         duration: 5000,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   return (
//     <form
//       ref={form}
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-6 font-sometimesTimes"
//     >
//       {/* Name Field */}
//       <div className="text-6xl">
//         <span className="whitespace-nowrap">Hello Daniel, my name</span>
//         <div className="flex mt-2">
//           <span className="whitespace-nowrap mr-4">is</span>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mt-2 border-b border-[#f1eed8] pb-2 text-lg focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]"
//             placeholder="Your name*"
//             required
//           />
//         </div>
//       </div>
//
//       {/* Company Field */}
//       <div className="flex">
//         <span className="text-6xl whitespace-nowrap mr-4">I work at</span>
//         <input
//           type="text"
//           name="company"
//           value={formData.company}
//           onChange={handleChange}
//           className="w-full mt-2 border-b border-[#f1eed8] pb-2 text-lg focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]"
//           placeholder="Your company"
//         />
//       </div>
//
//       {/* Message Field */}
//       <div className="flex flex-col gap-6">
//         <span className="text-6xl whitespace-nowrap">I would like to</span>
//         <Textarea
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           className="w-full mt-2 border-b border-[#f1eed8] pb-2 text-lg focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]"
//           placeholder="Your message*"
//           required
//         />
//       </div>
//
//       {/* Email Field */}
//       <div className="flex">
//         <span className="text-6xl whitespace-nowrap mr-4">
//           You can reach me at
//         </span>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mt-2 border-b border-[#f1eed8] pb-2 text-lg focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]"
//           placeholder="Your email*"
//           required
//         />
//       </div>
//
//       {/* Privacy Policy */}
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           name="privacy"
//           checked={formData.privacy}
//           onChange={handleChange}
//           className="w-4 h-4 rounded"
//           required
//         />
//         <span className="text-sm">
//           I agree to the{" "}
//           <a href="/privacy" className="underline">
//             privacy policy
//           </a>
//         </span>
//       </label>
//
//       {/* Submit Button */}
//       <button type="submit" className="text-left text-4xl">
//         {isSubmitting ? "[ sending... ]" : "[ send ]"}
//       </button>
//     </form>
//   );
// };
//
// export default ContactForm;

// TEST1
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { FormData } from "@/types/contact";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";
import useContainerDimensions from "@/hooks/useContainerDimensions";

const initialFormData: FormData = {
  name: "",
  company: "",
  message: "",
  email: "",
  privacy: false,
};

interface ContactFormProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ContactForm = ({ containerRef }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const dimensions = useContainerDimensions(containerRef);

  const getResponsiveConfig = (width: number) => {
    if (width < 410) {
      return {
        textSize: "text-2xl",
        inputTextSize: "text-base",
        gap: "gap-4 pb-4",
        buttonText: "text-2xl",
        privacyText: "text-xs",
        emailPosition: "",
      };
    } else if (width < 648) {
      return {
        textSize: "text-4xl",
        inputTextSize: "text-lg",
        gap: "gap-6 pb-4",
        buttonText: "text-3xl",
        privacyText: "text-sm",

        emailPosition: "",
      };
    } else if (width < 768) {
      return {
        textSize: "text-4xl",
        inputTextSize: "text-lg",
        gap: "gap-6 pb-4",
        buttonText: "text-3xl",
        privacyText: "text-sm",
        emailPosition: "flex",
      };
    } else if (width < 1204) {
      return {
        textSize: "text-6xl",
        inputTextSize: "text-xl",
        gap: "gap-8",
        buttonText: "text-4xl",
        privacyText: "text-base",
        emailPosition: "",
      };
    } else {
      return {
        textSize: "text-6xl",
        inputTextSize: "text-xl",
        gap: "gap-8",
        buttonText: "text-4xl",
        privacyText: "text-base",
        emailPosition: "flex",
      };
    }
  };

  const config = dimensions?.width
    ? getResponsiveConfig(dimensions.width)
    : getResponsiveConfig(1000);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Name Required",
        description: "Please enter your name.",
        duration: 3000,
      });
      return false;
    }
    if (!formData.message.trim()) {
      toast({
        variant: "destructive",
        title: "Message Required",
        description: "Please enter your message.",
        duration: 3000,
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter your email address.",
        duration: 3000,
      });
      return false;
    }
    if (!formData.privacy) {
      toast({
        variant: "destructive",
        title: "Privacy Policy",
        description: "Please accept the privacy policy to continue.",
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (form.current) {
        const emailData = {
          user_name: formData.name,
          user_email: formData.email,
          message: `${formData.company ? `Company: ${formData.company}\n\n` : ""}${formData.message}`,
        };

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          emailData,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        );

        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully.",
          duration: 3000,
        });

        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className={`flex flex-col ${config.gap}`}
    >
      {/* Name Field */}
      <div className={config.textSize}>
        <span className="whitespace-nowrap">Hello Daniel, my name</span>
        <div className="flex mt-2">
          <span className="whitespace-nowrap mr-4">is</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full mt-2 border-b border-[#f1eed8] pb-2 ${config.inputTextSize} focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]`}
            placeholder="Your name*"
            required
          />
        </div>
      </div>

      {/* Company Field */}
      <div className="flex">
        <span className={`${config.textSize} whitespace-nowrap mr-4`}>
          I work at
        </span>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full mt-2 border-b border-[#f1eed8] pb-2 ${config.inputTextSize} focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]`}
          placeholder="Your company"
        />
      </div>

      {/* Message Field */}
      <div className="flex flex-col">
        <span className={`${config.textSize} whitespace-nowrap`}>
          I would like to
        </span>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full mt-2 border-b border-[#f1eed8] pb-2 ${config.inputTextSize} focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]`}
          placeholder="Your message*"
          required
        />
      </div>

      {/* Email Field */}
      <div className={`${config.emailPosition}`}>
        <span className={`${config.textSize} whitespace-nowrap mr-4`}>
          You can reach me at
        </span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full mt-2 border-b border-[#f1eed8] pb-2 ${config.inputTextSize} focus:outline-none focus:border-[#f1eed8] bg-transparent placeholder-[#eee9cc]`}
          placeholder="Your email*"
          required
        />
      </div>

      {/* Privacy Policy */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          className="w-4 h-4 rounded"
          required
        />
        <span className={config.privacyText}>
          I agree to the{" "}
          <a href="/privacy" className="underline">
            privacy policy
          </a>
        </span>
      </label>

      {/* Submit Button */}
      <button type="submit" className={`text-left ${config.buttonText}`}>
        {isSubmitting ? "[ sending... ]" : "[ send ]"}
      </button>
    </form>
  );
};

export default ContactForm;
