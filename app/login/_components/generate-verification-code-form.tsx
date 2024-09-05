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
import { Input } from '@/app/_components/ui/input';
import { generateVerificationCodeInputSchema } from '@/src/entities/schemas/auth/generate-verification-code.schemas';

import * as Actions from '../actions';

export default function GenerateVerificationCodeForm() {
  const form = useForm({
    resolver: zodResolver(generateVerificationCodeInputSchema),
    defaultValues: {
      email: '',
    },
  });

  const generateVerificationCodeAction = useServerAction(
    Actions.generateVerificationCodeAction
  );

  function onSubmit(
    values: z.infer<typeof generateVerificationCodeInputSchema>
  ) {
    generateVerificationCodeAction.execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to dashboard</CardTitle>
        <CardDescription>
          A verification code will be sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              loading={generateVerificationCodeAction.isPending}
            >
              Get verification code
            </Button>
            {generateVerificationCodeAction.error && (
              <FormMessage>
                {generateVerificationCodeAction.error.message}
              </FormMessage>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
