import { ChevronDown, UserCog, HelpCircle, LogOut } from 'lucide-react'

import imgProfile from '../assets/IMG_1770-resized.png'

import nivoLogo from '../assets/logo-nivo.svg'
import { Badge } from './ui/badge'
import { DropDown } from './ui/DropDown'
import { Button } from './ui/button'

export function Header() {
  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <img src={nivoLogo} alt="nivo.video" />

          <Badge>BETA</Badge>
        </div>

        <svg
          width="6"
          height="16"
          viewBox="0 0 6 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.18372"
            y1="15.598"
            x2="5.32483"
            y2="0.143194"
            className="stroke-disabled"
          />
        </svg>

        <div className="flex items-center gap-2.5">
          <img
            src="src/assets/get-demo-logo.png"
            className="size-5 rounded-full"
            alt=""
          />

          <span className="text-sm font-medium text-text-primary">GetDemo</span>

          <Badge variant="primary">PRO</Badge>

          <ChevronDown className="text-disabled hover:text-text-primary size-4" />
        </div>

        <svg
          width="6"
          height="16"
          viewBox="0 0 6 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        </svg>

      </div>

      <div className="flex items-center gap-3 cursor-pointer relative">
        <div>
          <span className="text-sm font-medium text-primary hover:text-primary-hover">Giacomo Salsano</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <img
            src={imgProfile}
            className="w-8 h-8 rounded-full"
            alt="profile img"
          />
          <DropDown>
            <DropDown.Trigger>
              <div className="bg-primary rounded-full w-4 h-4 flex items-center justify-center absolute -right-1 -bottom-1.5 hover:bg-primary-hover transition-all focus:outline-none">
                <ChevronDown className='size-4' />
              </div>
            </DropDown.Trigger>
            <DropDown.Content className='align-end p-1 mt-4 border border-border rounded-lg'>
              <div className="p-2 bg-background flex flex-col gap-4">
                <div className=''>
                <section className="border-b-[1px] border-border">
                  <div className="flex gap-2">
                    <img
                      src={imgProfile}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col pb-2">
                      <span className="text-primary">Giacomo Salsano</span>
                      <small className="text-text-disabled">giacomosalsano@nivo.stream</small>
                    </div>
                  </div>
                </section>
                <section className="p-1 space-y-2 space-x-2">
                  <Button
                    className='rounded-lg'
                    variant='primary'>
                      <UserCog className='size-4'/>Ajustes</Button>
                  <Button
                    className='rounded-lg'
                    variant='primary'>
                      <HelpCircle className='size-4'/>Ajuda</Button>
                  <Button 
                    className='rounded-lg'
                    variant='cancel'>
                      <LogOut className='size-4'/>Sair</Button>
                </section>

                </div>
              </div>
            </DropDown.Content>
          </DropDown>
        </div>
      </div>
    </div>
  )
}





{/* <div className="cursor-pointer relative">
      <img
        src={avatarPleceHolder}
        alt="avatar"
        className="w-8 h-8 rounded-full"
      />
      <DropDown>
        <DropDown.Trigger>
          <div className="bg-primary rounded-full w-4 h-4 flex items-center justify-center absolute right-0 bottom-0 hover:bg-primary-hover hover:text-background transition-all">
            <FiChevronDown className="text-menu-bg" size={14} />
          </div>
        </DropDown.Trigger>
        <DropDown.Content align="end">
          <div className="flex flex-col gap-4">
            <section className="border-b-[1px] border-disabled">
              <div className="flex gap-2">
                <img
                  src={avatarPleceHolder}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-primary">{user.email}</span>
                  <small className="text-text-primary">{user.role}</small>
                </div>
              </div>
            </section>
            <section>
              <DropDown.Item onClick={handleSignOut}>
                <span className="flex items-center gap-2 py-2 pb-2 text-primary hover:text-primary-hover">
                  <FiLogOut />
                  Sair
                </span>
              </DropDown.Item>
            </section>
          </div>
        </DropDown.Content>
      </DropDown>
    </div> */}