import { userRolesEnum } from '../constants.js';
import { User } from '../models/user.model.js';

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res
        .status(404)
        .json({ success: false, msg: 'Could not find users' });
    }

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchStaff = async (req, res) => {
  try {
    const staff = await User.find({
      $or: [{ role: userRolesEnum.STAFF }, { role: userRolesEnum.ADMIN }],
    });

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, msg: 'Error while fetching staff' });
    }

    return res.status(200).json({ success: true, staff });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
