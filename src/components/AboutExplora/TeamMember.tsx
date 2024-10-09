interface TeamMemberProps {
  imagePath: string
  name: string
  role: string
  url: string
  urlDescription: string
}

function TeamMember({
  imagePath,
  name,
  role,
  url,
  urlDescription
}: TeamMemberProps) {
  return (
    <div className='text-center p-6'>
      <div className='flex justify-center items-center h-24 w-24 rounded-full shadow-2xl mx-auto mb-6'>
        <img
          src={imagePath}
          alt={name}
          className='rounded-full h-24 w-24 object-cover'
        />
      </div>
      <h3 className='text-xl font-semibold mb-2'>{name}</h3>
      <p>{role}</p>
      <a target='_blank' href={url} className='text-primary'>
        {urlDescription}
      </a>
    </div>
  )
}

export default TeamMember
