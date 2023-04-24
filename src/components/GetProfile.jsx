import { useFetchUsersQuery } from "../store";

function GetProfile() {
   const profile = useFetchUsersQuery();

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(profile);
   };

   return (
      <div>
         <form className="form-inline" onSubmit={handleSubmit}>
            <button className="btn btn-primary ml-2">submit</button>
         </form>
      </div>
   );
}

export default GetProfile;
