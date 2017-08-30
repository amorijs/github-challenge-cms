import React from 'react'

const PotPreview = (props) => (
  <div className='pot-preview panel panel-primary col-xs-12'>
    <div className='row'>
      <h2 className='h2 text-center'>{props.title}</h2>
      <table className='table'>
        <tbody>
          <tr>
            <td>Users</td>
            <td>{props.users}</td>
          </tr>
          <tr>
            <td>Pot Size</td>
            <td>{props.potSize}</td>
          </tr>
          <tr>
            <td>Start Time</td>
            <td>{new Date(props.startTime).toString()}</td>
          </tr>
          <tr>
            <td>End Time</td>
            <td>{new Date(props.endTime).toString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default PotPreview;