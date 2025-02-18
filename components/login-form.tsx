import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { SiGithub } from '@icons-pack/react-simple-icons'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <div className={'flex flex-col gap-6'}>
      <form className={cn('flex flex-col gap-6', className)} {...props}>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='font-bold text-2xl'>Login to your account</h1>
          <p className='text-balance text-muted-foreground text-sm'>
            Enter your email below to login to your account
          </p>
        </div>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>邮件地址</Label>
            <Input id='email' type='email' placeholder='m@example.com' required />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>密码</Label>
              <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                忘记密码?
              </a>
            </div>
            <Input id='password' type='password' required />
          </div>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </div>
      </form>
      <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t'>
        <span className='relative z-10 bg-background px-2 text-muted-foreground'>
          Or continue with
        </span>
      </div>
      <Button variant='outline' className='w-full'>
        <SiGithub size={24} />
        Login with GitHub
      </Button>
      <div className='text-center text-sm'>
        Don&apos;t have an account?{' '}
        <a href='#' className='underline underline-offset-4'>
          Sign up
        </a>
      </div>
    </div>
  )
}
