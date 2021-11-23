
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

//material-ui
import { Box, Modal, Button } from '@mui/material';

//context
import { useUser } from '../../Context/userContext'

//styles 
import styles from './modal.module.scss';

//history 
import history from '../../utils/history';
import moment from 'moment';

function ModalDetail({ id }) {
  const { users } = useUser();
  const params = useParams();
  const { setOpenModal } = useUser();
  const actualUrl = window.location.href;
  const [isCopied, setIsCopied] = useState(false); 
  const [userDetail, setUserDetail] = useState([])

  useEffect(() => {
    setUserDetail(users.filter((user) => {
      const first = user.name.first.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const last = user.name.last.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const idUser = `${first}${last}`
      return id === idUser || params.id === idUser}));

  },[params, id])

  const handleClose = () => {
    history.push('/');
    setOpenModal(false);
    setUserDetail([])
  }
  const handleClickCopy = () => {
    navigator.clipboard.writeText(actualUrl)
    setIsCopied(true);
  }
  return (
    <div>
      {userDetail.length > 0 && (
        <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.container}>
            <div className={styles.image}>
              {userDetail[0].picture.large && (
                <img src={userDetail[0].picture.large} alt={userDetail[0].name.first} />
              )}  
            </div>
            <div className={styles.title}>
              <h2>{userDetail[0].name.title} {userDetail[0].name.first} {userDetail[0].name.last}</h2>
            </div>
            <div className={styles.text}>
              <h4>Email: <p>{userDetail[0].email}</p></h4>
              <h4>Gender: <p>{userDetail[0].gender}</p></h4>    
            </div>
            <div className={styles.text}>
              <h4>Birth: <p>{moment(userDetail[0].dob.date).format('DD-MM-YYYY')}</p></h4>
              <h4>Phone: <p>{userDetail[0].phone}</p></h4>    
            </div>
            <div className={styles.text}>
              <h4>Nationality: <p>{userDetail[0].nat}</p></h4>
              <h4>Address: <p>{userDetail[0].location.street.name}, {userDetail[0].location.street.number}</p></h4>    
              <h4>ID: <p>{userDetail[0].id.value || 'null'}</p></h4>    
            </div>
            <div className={styles.text}>
              <h4>URL: <p>{actualUrl}</p> </h4>  
              <Button className={isCopied && styles.buttonCopy } variant="contained" onClick={handleClickCopy} > Copy </Button> 
            </div>
          </div>
        </Box>
      </Modal>
      )}  
    </div>
  )
}

export default ModalDetail;