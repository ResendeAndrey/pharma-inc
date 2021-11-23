import { shallow } from 'enzyme'
import React from 'react'
import { UserContextProvider } from '../../Context/userContext' 
import TableComponent from './table'

const sut = shallow(
<UserContextProvider>
  <TableComponent userItems={[]}/>
</UserContextProvider>
);

describe(('Table Component'), () => {
  afterEach(() => jest.clearAllMocks())
  it('Should match snapshot', () => {
    expect(sut.html()).toMatchSnapshot();
  })
  it('Should return data null', () => {
    expect(sut.find('td')).toEqual({});
  })
  it('Should return data', () => {
    const users = {
      "results": [
        {
          "gender": "female",
          "name": {
            "title": "Ms",
            "first": "Pamela",
            "last": "Fisher"
          },
          "dob": {
            "date": "1973-08-27T01:12:51.947Z",
            "age": 48
          },
          "registered": {
            "date": "2009-03-27T20:36:19.038Z",
            "age": 12
          },
          "nat": "US"
        }
      ],
      "info": {
        "seed": "6dea3e005ec27ce9",
        "results": 1,
        "page": 1,
        "version": "1.3"
      }
    }
    const data = shallow(
      <UserContextProvider>
        <TableComponent userItems={users}/>
      </UserContextProvider>
      );

    expect(data.find('td')).toEqual({})
  })
})