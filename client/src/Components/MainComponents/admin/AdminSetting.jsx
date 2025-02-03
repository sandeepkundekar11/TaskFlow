import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/constants";
import useGetApi from "@/CustomHooks/useGetApi";
import usePostApi from "@/CustomHooks/usePostApi";
import { useEffect, useState } from "react";

const AdminSettings = () => {

  const [EnableEdit, setEnableEdit] = useState(false)

  const [adminInfo, setAdminInfo] = useState({
    email: "",
    company: "",
    description: ""
  })
  // calling get admin info api
  const { callApi: getAdminInfo, data: AdminData } = useGetApi(`${BASE_URL}/admin/info/getAdmin`)

  // calling update admin info api

  const { callApi: updateAdmin, loading: updateLoading, data: updateMessage } = usePostApi(`${BASE_URL}/admin/info/updateAdmin`)

  // update profile
  const updateProfile = () => {
    updateAdmin(adminInfo)
  }

  useEffect(() => {
    // calling get api
    getAdminInfo()
  }, [])


  useEffect(() => {
    // handling loader
    setEnableEdit(false)
  }, [updateMessage])

  useEffect(() => {

    // updating state after calling get api
    setAdminInfo((prev) => {
      return {
        ...prev,
        email: AdminData?.admin?.email,
        company: AdminData?.admin?.company,
        description: AdminData?.admin?.description
      }
    })
  }, [AdminData])
  return (
    <div className=" w-[85%]  p-4">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">General Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Company Information
            </CardTitle>
            <CardDescription>Update your company details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" className={`${!EnableEdit && "cursor-not-allowed"}`}
                    placeholder="Enter company name" value={adminInfo?.company} onChange={(e) => {
                      EnableEdit && setAdminInfo((prev) => {
                        return {
                          ...prev,
                          company: e.target.value
                        }
                      })
                    }} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Email">Email</Label>
                  <Input id="Email" type="email" placeholder="abc@gmail.com"
                    className={`${!EnableEdit && "cursor-not-allowed"}`} value={adminInfo?.email}
                    onChange={(e) => {
                      EnableEdit && setAdminInfo((prev) => {
                        return {
                          ...prev,
                          email: e.target.value
                        }
                      })
                    }} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className={`w-full h-24 px-3 py-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline
                  ${!EnableEdit && "cursor-not-allowed"}`}
                  placeholder="Brief description of your company"
                  value={adminInfo?.description}
                  onChange={(e) => {
                    EnableEdit && setAdminInfo((prev) => {
                      return {
                        ...prev,
                        description: e.target.value
                      }
                    })
                  }}
                />
              </div>
              <div className="flex space-x-10">
                {
                  EnableEdit ? <div className="flex space-x-4">
                    <Button className="flex justify-center items-center h-10" onClick={updateProfile}>
                      {
                        updateLoading ? <div className="w-7 h-7 rounded-full bg-transparent border-b-2 border-l-2 animate-spin "></div> : "Save Changes"
                      }</Button>
                    <Button className="h-10" onClick={() => {
                      setEnableEdit(false)
                      // on cancel again calling get api
                      getAdminInfo()
                    }}>Cancel</Button>
                  </div> : <Button className="h-10" onClick={() => setEnableEdit(true)}>Edit</Button>
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default AdminSettings;
