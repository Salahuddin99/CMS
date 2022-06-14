import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('admin123'),
      isAdmin: true,
      isNGO: false,
    },
    {
      name: 'Din',
      email: 'din@gmail.com',
      password: bcrypt.hashSync('user123'),
      isAdmin: false,
      isNGO: false,
    },
  ],
  donation: [
    {
      //id: 1,
      name: 'Live and Learn in Kenya Sponsorship Program',
      by: 'Kenya Connect (KC)',
      category: 'Education',
      image: '/images/p2.jpg',
      donationGoal: 120000,
      currentdonation: 120000,
      Location: 'Kenya',
      description:
        'Imagine students in rural Kenya using computers and reading books! The Kenya Connect Learning Resource Center engages and empowers students and teachers from our 55 partner schools through access to technology including STEAM programs and computer literacy for girls and boys . ',
      Challenge:
        'In rural Kenya, the average student to teacher ratio is 50 to 1. Our partner schools are poorly supplied with resources and the majority of them are without electricity',
      Solution:
        'Our Learning Resource Center is equipped with 30 computers offering students and teachers the opportunity to join the 21st century with basic computer',
      LongTermImpact:
        'Literacy measurements and national test scores will improve. More students will graduate from primary and secondary school and be college ready. Students and teachers will be computer literate and gain 21st Century skills for the marketplace.',
      additionalDocumentation: 'Kenya Connect (KC)',
      bankAccountNo: 12312312312,
      companyRegistrationNumber: 1231231231,
      companyAddress: 'Kenya Connect (KC)',
      yearFounded: 123123123123,
      contactName: 'Kenya Connect (KC)',
      emailAddress: 'Kenya Connect (KC)',
      country: 'Kenya Connect (KC)',
      telephoneNo: 12313123123,
    },
    {
      //id: 2,
      name: 'Empower, Engage, Educate in Rural Kenya!',
      by: 'Leben und Lernen in Kenia e.V.',
      category: 'Education',
      image: '/images/p2.jpg',
      donationGoal: 120000,
      currentdonation: 100000,
      Location: 'Kenya',
      description:
        'Imagine students in rural Kenya using computers and reading books! The Kenya Connect Learning Resource Center engages and empowers students and teachers from our 55 partner schools through access to technology including STEAM programs and computer literacy for girls and boys . ',
      Challenge:
        'In rural Kenya, the average student to teacher ratio is 50 to 1. Our partner schools are poorly supplied with resources and the majority of them are without electricity',
      Solution:
        'Our Learning Resource Center is equipped with 30 computers offering students and teachers the opportunity to join the 21st century with basic computer',
      LongTermImpact:
        'Literacy measurements and national test scores will improve. More students will graduate from primary and secondary school and be college ready. Students and teachers will be computer literate and gain 21st Century skills for the marketplace.',
      additionalDocumentation: 'Kenya Connect (KC)',
      bankAccountNo: 12312312312,
      companyRegistrationNumber: 1231231231,
      companyAddress: 'Kenya Connect (KC)',
      yearFounded: 123123123123,
      contactName: 'Kenya Connect (KC)',
      emailAddress: 'Kenya Connect (KC)',
      country: 'Kenya Connect (KC)',
      telephoneNo: 12313123123,
    },
    {
      //id: 3,
      name: 'Gift an education...Make a life !',
      by: 'Isha Education',
      category: 'Food',
      image: '/images/p3.jpg',
      donationGoal: 120000,
      currentdonation: 100000,
      Location: 'Kenya',
      description:
        'Imagine students in rural Kenya using computers and reading books! The Kenya Connect Learning Resource Center engages and empowers students and teachers from our 55 partner schools through access to technology including STEAM programs and computer literacy for girls and boys . ',
      Challenge:
        'In rural Kenya, the average student to teacher ratio is 50 to 1. Our partner schools are poorly supplied with resources and the majority of them are without electricity',
      Solution:
        'Our Learning Resource Center is equipped with 30 computers offering students and teachers the opportunity to join the 21st century with basic computer',
      LongTermImpact:
        'Literacy measurements and national test scores will improve. More students will graduate from primary and secondary school and be college ready. Students and teachers will be computer literate and gain 21st Century skills for the marketplace.',
      additionalDocumentation: 'Kenya Connect (KC)',
      bankAccountNo: 12312312312,
      companyRegistrationNumber: 1231231231,
      companyAddress: 'Kenya Connect (KC)',
      yearFounded: 123123123123,
      contactName: 'Kenya Connect (KC)',
      emailAddress: 'Kenya Connect (KC)',
      country: 'Kenya Connect (KC)',
      telephoneNo: 12313123123,
    },
    {
      //id: 4,
      name: 'Educating young blind children for a better future',
      by: 'St. Nicholas Home, Penang',
      category: 'Food',
      image: '/images/p3.jpg',
      donationGoal: 120000,
      currentdonation: 100000,
      Location: 'Kenya',
      description:
        'Imagine students in rural Kenya using computers and reading books! The Kenya Connect Learning Resource Center engages and empowers students and teachers from our 55 partner schools through access to technology including STEAM programs and computer literacy for girls and boys . ',
      Challenge:
        'In rural Kenya, the average student to teacher ratio is 50 to 1. Our partner schools are poorly supplied with resources and the majority of them are without electricity',
      Solution:
        'Our Learning Resource Center is equipped with 30 computers offering students and teachers the opportunity to join the 21st century with basic computer',
      LongTermImpact:
        'Literacy measurements and national test scores will improve. More students will graduate from primary and secondary school and be college ready. Students and teachers will be computer literate and gain 21st Century skills for the marketplace.',
      additionalDocumentation: 'Kenya Connect (KC)',
      bankAccountNo: 12312312312,
      companyRegistrationNumber: 1231231231,
      companyAddress: 'Kenya Connect (KC)',
      yearFounded: 123123123123,
      contactName: 'Kenya Connect (KC)',
      emailAddress: 'Kenya Connect (KC)',
      country: 'Kenya Connect (KC)',
      telephoneNo: 12313123123,
    },
  ],
}
export default data
