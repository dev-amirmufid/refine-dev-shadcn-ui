import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  useActiveAuthProvider,
  useLink,
  useRegister,
  useRouterContext,
  useRouterType,
  useTranslate,
  type RegisterPageProps,
} from "@refinedev/core";
import type {
  DivPropsType,
  FormPropsType,
} from "@refinedev/core/dist/components/pages/auth";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "../schema/register.schema";

type RegisterProps = RegisterPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
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
  const { mutate: register, isLoading } = useRegister({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    register(values, {
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
                register({
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
          {translate("pages.register.title", "Sign up for your account")}
        </CardTitle>
        <CardDescription>
          {translate(
            "pages.register.subTitle",
            "Enter your information to create an account"
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
                          {translate("pages.register.fields.email", "Email")}
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
                              "pages.register.fields.password",
                              "Password"
                            )}
                          </FormLabel>
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
                  {translate("pages.register.buttons.submit", "Sign up")}
                </Button>
              </div>
            </form>
          </Form>
        )}
        {renderProviders()}
        {loginLink ?? (
          <div className="mt-4 text-center text-sm">
            {translate(
              "pages.register.buttons.haveAccount",
              "Have an account?"
            )}
            {renderLink(
              "/login",
              translate("pages.register.signin", "Sign in")
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
