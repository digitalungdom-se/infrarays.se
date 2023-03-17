import Plate from "components/Plate";
import { authFail, authSuccess } from "features/auth/authSlice";

import Portal from "features/portal";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  useLoginWithEmailAndCodeMutation,
  useRevokeMutation,
  useSendLoginCodeMutation,
} from "services/auth";
import { useGetUserQuery, userApi } from "services/user";
// import { value useAuth } from "features/auth/authHooks";
import { useGetApplicationQuery } from "services/application";
import { useGetFilesQuery } from "services/file";
import { useGetSurveyQuery } from "services/survey";
import { useAuth } from "hooks/auth";

export default function Home(): JSX.Element {
  // const [loginWithEmailAndCode] = useLoginWithEmailAndCodeMutation();
  // const [sendLoginCode] = useSendLoginCodeMutation();
  // const [revoke] = useRevokeMutation();
  // const { data } = useGetUserQuery("@me");
  // useGetFilesQuery();
  // useGetSurveyQuery();
  // // const { data: application } = useGetApplicationQuery("@me");
  // const dispatch = useDispatch();

  return (
    <Plate className="max-w-3xl mt-12 w-full py-12 prose">
      <Portal />
    </Plate>
  );
}
