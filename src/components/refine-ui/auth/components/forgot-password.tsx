import {
  useForgotPassword,
  useLink,
  useRouterContext,
  useRouterType,
  useTranslate,
  type ForgotPasswordFormTypes,
  type ForgotPasswordPageProps,
} from "@refinedev/core";
import type {
  DivPropsType,
  FormPropsType,
} from "@refinedev/core/dist/components/pages/auth";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema } from "../schema/forgot-password.schema";
type ForgotPasswordProps = ForgotPasswordPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const { mutate: forgotPassword } =
    useForgotPassword<ForgotPasswordFormTypes>();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    forgotPassword(values, {
      onSuccess: (data) => {
        console.log(data, "amirmufid");

        // handle success
      },
    });
  }

  const renderLink = (link: string, text?: string) => {
    return <ActiveLink to={link}>{text}</ActiveLink>;
  };

  const content = (
    <Card className="mx-auto w-full max-w-sm" {...contentProps}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {translate("pages.forgotPassword.title", "Forgot your password?")}
        </CardTitle>
        <CardDescription>
          {translate(
            "pages.forgotPassword.subTitle",
            "Enter your email below to recive recovery password from email"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} {...formProps}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {translate(
                          "pages.forgotPassword.fields.email",
                          "Email"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                {translate(
                  "pages.forgotPassword.buttons.submit",
                  "Send reset instructions"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {loginLink ?? (
          <div className="mt-4 text-center text-sm">
            {translate(
              "pages.register.buttons.haveAccount",
              "Have an account? "
            )}
            {renderLink("/login", translate("pages.login.signin", "Sign in"))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
