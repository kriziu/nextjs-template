'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';

import { Button } from '@/app/_components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/app/_components/ui/input-otp';
import { validateVerificationCodeInputSchema } from '@/src/entities/schemas/auth/validate-verification-code.schemas';

import * as Actions from '../actions';

type ValidateVerificationCodeFormProps = Readonly<{
  email: string;
  verifyToken: string;
}>;

export default function ValidateVerificationCodeForm({
  verifyToken,
  email,
}: ValidateVerificationCodeFormProps) {
  const form = useForm({
    resolver: zodResolver(validateVerificationCodeInputSchema),
    defaultValues: {
      email,
      verifyToken,
      code: '',
    },
  });

  const validateVerificationCodeAction = useServerAction(
    Actions.validateVerificationCodeAction,
    {
      onError: () => {
        form.resetField('code');
      },
    }
  );

  function onSubmit(
    values: z.infer<typeof validateVerificationCodeInputSchema>
  ) {
    validateVerificationCodeAction.execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify code</CardTitle>
        <CardDescription>
          A verification has been sent to {email}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={8}
                      {...field}
                      onChange={code => {
                        field.onChange(code);

                        if (code.length === 8) {
                          validateVerificationCodeAction.execute({
                            ...form.getValues(),
                            code,
                          });
                        }
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              loading={validateVerificationCodeAction.isPending}
            >
              Verify code
            </Button>
            {validateVerificationCodeAction.error && (
              <FormMessage>
                {validateVerificationCodeAction.error.message}
              </FormMessage>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
