'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginUserDto, loginUserSchema } from '@/entities/user';

import * as Actions from '../actions';

export default function LoginUserForm() {
  const form = useForm<LoginUserDto>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginUserAction = useServerAction(Actions.loginUserAction);

  function onSubmit(values: LoginUserDto) {
    loginUserAction.execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to dashboard</CardTitle>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Your password..." type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" loading={loginUserAction.isPending}>
              Login
            </Button>
            {loginUserAction.error && (
              <FormMessage>{loginUserAction.error.message}</FormMessage>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
