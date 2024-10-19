const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find(c => c.startsWith(`${name}=`))
  return cookie ? cookie.split('=')[1] : null
}

export const getToken = () => {
  return getCookie('token')
}

export const getBearerToken = () => {
  return `Bearer ${getToken()}`
}
