

import { destroyTripeAsync} from './tripSlice'

function ButtonGroup(props:any) {

    function handleClick(e:any) {
        const payload = {
            trip: {
                trip_id: props.trip_id
            }
        }
        props.dispatch(destroyTripeAsync(payload));
    }
  return <div className="btn-group float-end">
      <button 
        className="btn btn-warning m-1"
        onClick={() => props.toggleEditForm()}>Edit</button>
      <button 
      className="btn btn-danger m-1" 
      onClick={(e) => handleClick(e)}>Delete</button>
  </div>;
}

export default ButtonGroup;