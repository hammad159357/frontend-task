import React from 'react'
import { Modal, Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <>
    <div className="text-center position-absolute top-0 start-0"
              style={{
                backgroundColor: "rgb(135 135 133 / 50%)",
                height: "500px", width: "500px"
              }}>
              <div className='d-flex justify-content-center align-items-center' style={{ height: "500px", width: "500px" }}>
                {<Spinner animation="border" variant="primary" />}
              </div>
            </div>
    </>
  )
}

export default Loader