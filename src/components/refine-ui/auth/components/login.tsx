import React from "react";

import {
  useActiveAuthProvider,
  useLink,
  useLogin,
  useRouterContext,
  useRouterType,
  useTranslate,
  type LoginFormTypes,
  type LoginPageProps,
} from "@refinedev/core";

import type {
  DivPropsType,
  FormPropsType,
} from "@refinedev/core/dist/components/pages/auth";

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
import { loginSchema } from "../schema/login.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title = undefined,
  hideForm,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values, {
      onSuccess: (data) => {
        console.log(data, "amirmufid");

        // handle success
      },
    });
  }

  const renderLink = (link: string, text?: string) => {
    return <ActiveLink to={link}>{text}</ActiveLink>;
  };

  const renderProviders = () => {
    if (providers) {
      return (
        <div className="my-4 space-y-4">
          <Separator />

          {providers.map((provider) => (
            <Button
              key={provider.name}
              variant="outline"
              className="w-full inline-flex gap-2"
              onClick={() =>
                login({
                  providerName: provider.name,
                })
              }
            >
              {provider?.icon}
              {provider.label ?? <label>{provider.label}</label>}
            </Button>
          ))}
        </div>
      );
    }
    return null;
  };

  const content = (
    <Card className="mx-auto w-full max-w-sm" {...contentProps}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {translate("pages.login.title", "Sign in to your account")}
        </CardTitle>
        <CardDescription>
          {translate(
            "pages.login.subTitle",
            "Enter your email below to login to your account"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hideForm && (
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
                          {translate("pages.login.fields.email", "Email")}
                        </FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>
                            {translate(
                              "pages.login.fields.password",
                              "Password"
                            )}
                          </FormLabel>
                          <div className="ml-auto inline-block text-sm underline">
                            {forgotPasswordLink ??
                              renderLink(
                                "/forgot-password",
                                translate(
                                  "pages.login.buttons.forgotPassword",
                                  "Forgot password?"
                                )
                              )}
                          </div>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {translate("pages.login.buttons.submit", "Sign In")}
                </Button>
              </div>
            </form>
          </Form>
        )}
        {renderProviders()}
        {registerLink ?? (
          <div className="mt-4 text-center text-sm">
            {translate(
              "pages.login.buttons.noAccount",
              "Don’t have an account?"
            )}{" "}
            {renderLink(
              "/register",
              translate("pages.login.register", "Sign up")
            )}
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
