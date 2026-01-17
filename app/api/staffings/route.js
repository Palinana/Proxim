import connectDB from '../../../config/database'; 
import Staffing from '../../../models/Staffing';

// GET api/staffings
export const GET = async (request) => {
    try {
        await connectDB();

        const staffings = await Staffing.find({});
        const count = await Staffing.countDocuments();
        console.log("Staffings count:", count);
                
        return new Response(JSON.stringify({ staffings }),  { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("something went wrong",  { status: 500 });
    }
};
