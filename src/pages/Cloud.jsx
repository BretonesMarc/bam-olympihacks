import { useState } from 'react'

const Cloud = () => {
  const [fileName, setFileName] = useState('')
  const [fid, setFid] = useState('')
  const [isUploaded, setIsUploaded] = useState(false)

  const handleUpload = (event) => {
    event.preventDefault()

    const fileInput = document.querySelector('input[type="file"]')
    const file = fileInput.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      fetch('http://0.0.0.0:2929/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.fid != null || data.fid != undefined) {
            localStorage.setItem('fileName', file.name)
            localStorage.setItem('fid', data.fid)
            setFileName(file.name)
            setFid(data.fid)
          } else {
            console.log('Error uploading the file! Try Again!')
          }
        })
        .catch((error) => {
          console.error('Upload error:', error)
          // Handle any error that occurred during upload
        })
    }
    setIsUploaded(true)
  }

  const handleDownload = (event) => {
    event.preventDefault()

    const storedFid = localStorage.getItem('fid')
    const storedFileName = localStorage.getItem('fileName')
    const url = 'https://biphan.cloud/download/' + storedFid

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = storedFileName
        document.body.appendChild(a) // Required in Firefox
        a.click()
        a.remove() // After triggering click, remove the element
      })
      .catch((error) => console.error('Error:', error))
  }

  return (
    <main className="file">
      <section className="file-upload">
        <h1>Upload your files to Jackal!</h1>
        <form
          id="uploadForm"
          encType="multipart/form-data"
          onSubmit={handleUpload}
        >
          <input type="file" name="file" />
          <button type="submit">Upload</button>
        </form>

        {isUploaded && (
          <form
            id="downloadForm"
            encType="multipart/form-data"
            onSubmit={handleDownload}
          >
            <label>{fileName}</label>
            <button type="submit">Download</button>
          </form>
        )}
      </section>
    </main>
  )
}

export default Cloud
