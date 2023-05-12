import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import public from "../../../../server/public/images"
function Profile() {
  const [image, setImage] = useState(null);
  // const [dp,setDp] = useState(null)

  const [upload, setUpload] = useState([]);
  console.log(upload);
  const localStorageData = useSelector((state) => state.localStorage.data);
  const AuthId = localStorageData._id;
  const confiq = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const getuser = async () => {
    await axios.post("http://localhost:2000/uploadImage",{
      id:AuthId
    }).then((res)=>{
    setUpload(res.data.showUser);
    })
  };

  useEffect(() => {
    getuser();
 
  },[]);

  console.log(image);
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const addImage = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("photo", image);

    await axios
      .post(`http://localhost:2000/profile/${AuthId}`, formData, confiq)
      .then((res) => {
        console.log(res.data.userDatas);
        getuser();

      });
  };
  // const imageUploading = async()=>{
  //   let file = new FormData()
  //   file.append("image",image);
  // }
  // console.log(imageUploading);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <h3 className="text-dark">Profile</h3>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <Link to={"/"}>
                <h6
                  className="text-dark   px-4 me-4 mt-2  "
                  style={{ cursor: "pointer" }}
                >
                  Home
                </h6>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="row justify-content-center my-5 py-5">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src={
                 upload.image ?   `http://localhost:2000/images/${upload.image}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                
                }
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px", height: "200px" }}
              />
              <h5 className="my-3">{upload.fname}</h5>
              <p className="text-muted mb-1">{upload.email}</p>
              {/* <p className="text-muted mb-4">{upload.phone}</p> */}
              <div className="mb-2">
                <div>
                  <input
                    type="file"
                    className="btn btn-outline-dark"
                    onChange={handleImage}
                    name="photo"
                  />
                </div>
                <div>
                  <button
                    className="btn btn-outline-dark mt-3"
                    type="button"
                    onClick={addImage}
                  >
                   {upload.image ?  "Change" : "Add" } 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
