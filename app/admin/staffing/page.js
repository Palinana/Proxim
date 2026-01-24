// import connectDB from "@/config/database";
// import Staffing from "@/models/Staffing";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/utils/authOptions";
// import StaffingList from "@/components/staffing/StaffingList";

// export default async function AdminStaffingPage({ searchParams }) {
//     await connectDB();

//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "admin") {
//         return null; // or redirect
//     }

//     // const staffings = await Staffing.find({
//     //     "coordinator._id": session.user.id
//     // })
//     //     .sort({ createdAt: -1 })
//     //     .lean();
   
//     // const plainStaffings = staffings.map((s) => ({
//     //     ...s,
//     //     _id: s._id.toString(),
//     // }));

//     const role = session.user.role;
//     const userId = session.user.id;

// //   // Fetch staffings for this admin and populate coordinator info
// //   const staffings = await Staffing.find({ coordinator: userId })
// //     .populate("coordinator", "first_name last_name email phone role")
// //     .sort({ createdAt: -1 })
// //     .lean();

// //     // Convert _id to string for client
// //   const plainStaffings = staffings.map((s) => ({
// //     ...s,
// //     _id: s._id.toString(),
// //     coordinator: s.coordinator
// //       ? { ...s.coordinator, _id: s.coordinator._id.toString() }
// //       : null,
// //   }));

// const query = {};

//   // admin should only see their own
//   query.coordinator = userId;


//   // Apply filters from URL
//   if (searchParams?.service) query.serviceType = searchParams.service;
//   if (searchParams?.status) query.status = searchParams.status;
//   if (searchParams?.borough) query["location.city"] = searchParams.borough;

//   if (searchParams?.zip) {
//     query["location.zipcode"] = { $in: searchParams.zip.split(",") };
//   }

//   if (searchParams?.mandate) {
//     const mandates = searchParams.mandate.split(",");
//     const mandateQueries = mandates.map((m) => {
//       const [visits, duration] = m.split("x").map(Number);
//       return {
//         "workload.visits": visits,
//         "workload.duration": duration,
//       };
//     });
//     query.$or = mandateQueries;
//   }

//   const sort = searchParams?.sort === "old" ? 1 : -1;

//   const staffings = await Staffing.find(query)
//     .populate("coordinator", "first_name last_name email phone role")
//     .sort({ createdAt: sort })
//     .lean();

//   const plainStaffings = staffings.map((s) => ({
//     ...s,
//     _id: s._id.toString(),
//     coordinator: s.coordinator
//       ? { ...s.coordinator, _id: s.coordinator._id.toString() }
//       : null,
//   }));

//     return (
//         // <div className="flex flex-col h-full bg-gray-50">
//         //     {/* Top bar */}
//         //     {/* <div className="border-b bg-background px-6 md:px-8 py-3">
//         //         <h1 className="text-xl font-semibold">My Staffing</h1>
//         //     </div> */}
        
//         //     {/* Centered content */}
//         //     <div className="flex flex-1 justify-center py-10">
//         //         <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-sm">
//         //             <StaffingList staffings={plainStaffings} />
//         //         </div>
//         //     </div>
//         // </div>

//         //working:
//         // <div className="flex flex-col h-screen bg-gray-50">
//         //           <div className="border-b bg-background px-6 md:px-8 py-3">
//         //         <h1 className="text-xl font-semibold">My Staffing</h1>
//         //      </div>
             
//         //     <div className="flex-1 flex justify-center">
//         //         <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-sm h-[calc(100vh-120px)]">
//         //             <StaffingList staffings={plainStaffings} />
//         //         </div>
//         //     </div>
//         // </div>

//          //working with top spacing:
//     // <div className="flex flex-col h-screen bg-gray-50">
//     //     {/* Spacer header */}
//     //     <div className="bg-background px-6 md:px-8 py-5">
//     //         <div className="mt-5 mb-2" />
//     //     </div>

//     //     {/* Centered content */}
//     //     <div className="flex flex-1 justify-center">
//     //     <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-sm h-[calc(100vh-120px)]">
//     //         <StaffingList staffings={plainStaffings} />
//     //     </div>
//     //     </div>
//     // </div>

//     // <div className="h-full bg-gray-50 px-6 md:px-8 py-6">
//     //     <div className="mx-auto max-w-4xl h-full">
//     //         <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col p-6">
//     //             <div className="flex-1 overflow-y-auto">
//     //                 <StaffingList staffings={plainStaffings} />
//     //             </div>
//     //         </div>
//     //     </div>
//     // </div>

//     <div className="h-full bg-gray-50 px-6 md:px-8 py-6">
//         <div className="mx-auto max-w-4xl h-full">
//             <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
//                 <div className="flex-1 overflow-y-auto px-5 py-5">
//                     <StaffingList staffings={plainStaffings} total={plainStaffings.length}/>
//                 </div>
//             </div>
//         </div>
//     </div>


//     );
// }


import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import StaffingList from "@/components/staffing/StaffingList";

export default async function AdminStaffingPage({ searchParams }) {
    await connectDB();

    const params =
    typeof searchParams?.then === "function"
        ? await searchParams
        : searchParams;

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") return null;

    const userId = session.user.id;

    // Server side params (plain object)
    const service = params?.service;
    const status = params?.status;
    const borough = params?.borough;
    const zip = params?.zip;
    const mandate = params?.mandate;
    const ei = params?.ei;

    const query = { coordinator: userId };

    if (ei) query.caseId = ei;
    if (service) query.serviceType = service;
    if (status) query.status = status;
    if (borough) query["location.city"] = borough;

    if (zip) {
        query["location.zipcode"] = { $in: zip.split(",") };
    }

    if (mandate) {
        const mandates = mandate.split(",");
        const mandateQueries = mandates.map((m) => {
        const [visits, duration] = m.split("x").map(Number);
        return {
            "workload.visits": visits,
            "workload.duration": duration,
        };
        });
        query.$or = mandateQueries;
    }
    
    const normalize = (list) =>
        list.map((s) => ({
          ...s,
          _id: s._id.toString(),
          coordinator: s.coordinator
            ? { ...s.coordinator, _id: s.coordinator._id.toString() }
            : null,
        }));
      
    const staffings = await Staffing.find(query)
        .populate("coordinator", "first_name last_name email phone role")
        .sort({ createdAt: -1 })
        .lean();
      
    const allStaffingsRaw = await Staffing.find({ coordinator: userId }).lean();
    const plainStaffings = JSON.parse(JSON.stringify(normalize(staffings)));
    const allStaffings = JSON.parse(JSON.stringify(normalize(allStaffingsRaw)));

    return (
        <div className="h-full bg-gray-50 px-6 md:px-8 py-6">
            <div className="mx-auto max-w-4xl h-full">
                <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto px-5 py-5">
                        <StaffingList
                            staffings={plainStaffings}
                            allStaffing={allStaffings} // for filtering options
                            total={plainStaffings.length}
                            admins={[]}
                            isSuperadmin={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
