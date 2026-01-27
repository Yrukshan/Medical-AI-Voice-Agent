"use client"

import { UserButton } from '@clerk/nextjs'
import { index } from 'drizzle-orm/gel-core'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const menuOptions = [
    {
        id: 1,
        name: 'Home',
        path: '/dashboard'
    },
    {
        id: 2,
        name: 'History',
        path: '/dashboard/history'
    },
    {
        id: 3,
        name: 'Pricing',
        path: '/dashboard/billing'
    }
]

function AppHeader() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className='relative'>
      <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 bg-gray-300'>
        <Image src={'/logo.png'} alt='logo' width={180} height={90} />

        {/* Desktop Menu (unchanged) */}
        <div className='hidden md:flex gap-12 items-center font-semibold'>
            {menuOptions.map((Option,index)=>(
                <Link key={index} href={Option.path}>
                    <h2 className='hover:font-bold cursor-pointer'>{Option.name}</h2>
                </Link>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
          <UserButton />
        </div>

        {/* Desktop User Button */}
        <div className="hidden md:block">
          <UserButton />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {openMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-300 shadow-lg flex flex-col gap-4 p-6 z-50">
          {menuOptions.map((Option,index)=>(
            <Link
              key={index}
              href={Option.path}
              onClick={() => setOpenMenu(false)}
            >
              <h2 className="font-semibold hover:font-bold">{Option.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AppHeader
