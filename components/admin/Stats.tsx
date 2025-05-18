'use client'
import React from 'react'
import CountUp from 'react-countup'

interface IStats {
  stats: {
    borrowedBooksCount: number
    booksCopiesCount: number
    usersCount: number
    accountRequestsCount: number
    booksCount: number
  }
}

const Stats = ({ stats }: IStats) => {
  const statItems = [
    { label: 'Borrowed Books', value: stats.borrowedBooksCount },
    { label: 'Book Copies', value: stats.booksCopiesCount },
    { label: 'Account Requests', value: stats.accountRequestsCount },
    { label: 'Total Users', value: stats.usersCount },
    { label: 'Total Titles', value: stats.booksCount },
  ]

  return (
    <div className="gap-3 grid grid-cols-5 font-ibm-plex-sans">
      {statItems.map((item, index) => (
        <div key={index} className="p-5 gap-3 flex flex-col w-full">
          <h1 className="text-gray-700 font-semibold">{item.label}</h1>
          <h1 className="text-4xl font-black">
            <CountUp end={item.value} duration={1.5} separator="," />
          </h1>
        </div>
      ))}
    </div>
  )
}

export default Stats
