"use client"

import React, { useState } from 'react'
import { VideoIcon, MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import Button from './Button'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo */}
          <div className="flex items-center">
            <VideoIcon className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
              VideoBox
            </span>
          </div>

          {/* Middle: Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">
              Features
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">
              Pricing
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
          </div>

          {/* Right side: Login, Sign Up, ThemeSwitcher */}
          <div className="flex items-center space-x-4">
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 focus:outline-none"
              >
                {isMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium">
              Features
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium">
              Pricing
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <div className="flex flex-col space-y-2 px-3 py-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
