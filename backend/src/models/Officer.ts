import mongoose from 'mongoose';

export interface IOfficer extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  position: string;
  department: string;
  bio: string;
  image: string;
  contactInfo: {
    phone: string;
    email: string;
    office: string;
  };
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

const officerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    position: {
      type: String,
      required: [true, 'Please provide a position'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Please provide a department'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Please provide a bio'],
      trim: true,
    },
    image: {
      type: String,
      default: 'default-officer.jpg',
    },
    contactInfo: {
      phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
      },
      email: {
        type: String,
        required: [true, 'Please provide an email'],
      },
      office: {
        type: String,
        required: [true, 'Please provide an office location'],
      },
    },
    socialMedia: {
      linkedin: String,
      twitter: String,
      facebook: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOfficer>('Officer', officerSchema); 