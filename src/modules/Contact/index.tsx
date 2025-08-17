import { type FC } from "react";
import * as S from "./styled";
import { TextBox } from "@components/textBox";
import { FadeIn } from "@utils/animations/FadeIn";
import { ContactForm } from "./ContactForm";
import type { FormContext } from "@utils/emailjs";

interface ContactProps {
  context?: FormContext;
  title?: string;
  description?: string;
  showExtraFields?: boolean;
}

export const Contact: FC<ContactProps> = ({ 
  context = 'contact', 
  title,
  description,
  showExtraFields = false 
}) => {
    return (
        <S.ContactStyled>
            <S.ContainerStyled>
                <FadeIn>
                    <ContactForm 
                        context={context}
                        title={title}
                        description={description}
                        showExtraFields={showExtraFields}
                    />
                </FadeIn>
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
