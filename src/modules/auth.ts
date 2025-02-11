// src/modules/authen.ts
import { Elysia, t } from 'elysia'
import { supabase } from '../utils/supabase'
import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js'

/**
 * @description Authentication module
 * @param app
 * @returns
 */
export const auth = (app: Elysia) =>
    app.group('/auth', (app) =>
        app
            .model({
                sign: t.Object({
                    email: t.String({
                        format: 'email'
                    }),
                    password: t.String({
                        minLength: 8
                    })
                })
            })
            .post(
                '/sign-up',
                async ({ body }) => {
                    const { data, error } = await supabase.auth.signUp(body as SignUpWithPasswordCredentials)

                    if (error) return error
                    return data.user
                },
                {
                    schema: {
                        body: 'sign'
                    }
                }
            )
            .post(
                '/sign-in',
                async ({ body }) => {
                    const { data, error } =
                        await supabase.auth.signInWithPassword(body as SignInWithPasswordCredentials)

                    if (error) return error

                    return data.user
                },
                {
                    schema: {
                        body: 'sign'
                    }
                }
            )
            .get(
                '/refresh',
                async ({ set, cookie: { refresh_token } }) => {
                    const { data, error } = await supabase.auth.refreshSession({
                        refresh_token: refresh_token.value || ''
                    })

                    if (error) return error

                    setCookie('refresh_token', data.session!.refresh_token)

                    return data.user
                }
            )
    )