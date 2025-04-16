import { type FC, useState } from "react";
import * as S from "./styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStyled } from "@components/Form";
import { Input } from "@components/Form/components/Input";
import { Button } from "@components/Button";
import { TextBox } from "@components/textBox";
import axios from "axios";
import { FadeIn } from "@utils/animations/FadeIn";

/**
 * just for example contact form is setup with
 * @url https://emailjs.com
 */
export const Contact: FC = () => {
    const [emailSend, setEmailSend] = useState(false);

    /**
     * Zod schema for form validation
     */
    const schema = z.object({
        name: z.string().min(2, {
            message: "Name should be at least 2 characters",
        }),
        email: z.string().email({
            message: "Please enter a valid email",
        }),
        message: z.string().min(10, {
            message: "Message should be at least 10 characters",
        }),
    });

    /**
     * React hook form setup
     */
    const contactForm = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    /**
     * Submit form function
     * @param {Object} values - form values
     * @returns {Promise<void>}
     * just for example contact form is setup with
     * @url https://emailjs.com
     * you can use any other service or setup your own
     *
     * when you setup your own service
     * remember to store somewhere else data like api keys  to be more secure
     */
    const formSubmit = contactForm.handleSubmit(async (values) => {
        axios
            .post("https://api.emailjs.com/api/v1.0/email/send", {
                service_id: "service_1r5ot0q",
                template_id: "template_g7uyjgz",
                user_id: "GxXnz-tyDQeFi0sDZ",
                template_params: {
                    name: values.name,
                    email: values.email,
                    message: values.message,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setEmailSend(true);
                }
            });
    });

    return (
        <S.ContactStyled>
            <S.ContainerStyled>
                {!emailSend ? (
                    <FadeIn>
                        <FormStyled onSubmit={formSubmit}>
                            <h2>
                                Have any questions or want to work together?{" "}
                                <b>Let's talk!</b>
                            </h2>
                            <p>
                                change API links to your own service to make it
                                work (whole script is setup correctly just
                                change API links)
                            </p>
                            <Input
                                type="text"
                                placeholder="Name *"
                                register={contactForm.register("name")}
                                error={
                                    contactForm.formState.errors.name?.message
                                }
                            />
                            <Input
                                type="email"
                                placeholder="Email *"
                                register={contactForm.register("email")}
                                error={
                                    contactForm.formState.errors.email?.message
                                }
                            />
                            <Input
                                type="textarea"
                                placeholder="Message *"
                                register={contactForm.register("message")}
                                error={
                                    contactForm.formState.errors.message
                                        ?.message
                                }
                            />
                            <Button
                                asButton={true}
                                type="submit"
                                variant="secondary"
                            >
                                Submit
                            </Button>
                        </FormStyled>
                    </FadeIn>
                ) : (
                    <S.ContactThankYou>
                        Thank you for your message! I will get back to you as
                        soon as possible
                    </S.ContactThankYou>
                )}
                <S.ContactBox>
                    <FadeIn delay={0.2}>
                        <h2>Send via email</h2>
                        <TextBox
                            bgText="Email"
                            boxAsLink={true}
                            href="mailto:info@setupandsmile.com"
                            target="_blank"
                            children={`
                            <h3>Click to send email</h3>
                            <p>
                                Feel free to send us an email if you have any
                                questions
                            </p>
                            `}
                        />
                    </FadeIn>
                </S.ContactBox>
            </S.ContainerStyled>
        </S.ContactStyled>
    );
};
