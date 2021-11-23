import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom'

//components
import Navbar from '../Components/Navbar/Navbar';
import Modal from '../Components/Modal/Modal';
import TableComponent from '../Components/Table/table';
import Input from '../Components/Input/input';

//styles
import styles from './home.module.scss';
import { lorem } from '../utils/lorem';

//api
import api from '../services/api'

//context
import { useUser } from '../Context/userContext'
import { Button } from '@material-ui/core';


const Home = () => {
  const params = useParams();
  const {users, saveUsers, setOpenModal, openModal } = useUser();
  const [userFilter, setUserFilter] = useState();
  const [userId, setUserId] = useState([])
  const [page, setPage] = useState(1);
  const baseURL = `https://randomuser.me/api?results=50&page=${page}`;
  const dataRender = !userFilter ? users : userFilter;
 
  useMemo(async () => {
    if(params.id) {
      setOpenModal(true);
    } 
    if(users.length === 0) {
      await api.get(baseURL).then((response) => {
        saveUsers(response.data.results); 
        localStorage.setItem("users", JSON.stringify(response.data.results)); 
      });
      
    }
  }, [baseURL, params])

  const handleClickLoadMore = async() => {
    setPage(page +1);
    await api.get(baseURL).then((response) => {
      saveUsers(response.data.results); 
    });
  }

  const handleSearch = (event) => {
    if(event) {
      const usersFiltered = users.filter((user) => {
          return user.name.first.toLowerCase().includes(event.toLowerCase().trim()) || 
        user.name.last.toLowerCase().includes(event.toLowerCase().trim()) || 
        user.location.country.toLowerCase().includes(event.toLowerCase().trim())
       
      })
      setUserFilter(usersFiltered);
    }
  }
 
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <p> {lorem} </p>
        <div>
          <Input handleSearch={handleSearch}/>
        </div>
       <div>
         <TableComponent setUserId={setUserId} userItems={dataRender}/>
       </div>
       <div >
       <Button className={styles.loadMore} variant="contained" onClick={handleClickLoadMore} > LoadMore </Button> 
       </div>
        </div>
        {openModal === true && (
           <Modal id={userId}/>
        )} 
    </div>
  );
}

export default Home;