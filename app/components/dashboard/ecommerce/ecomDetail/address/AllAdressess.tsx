import React, { useState } from 'react'
import { AddressCard } from './Cards';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { AddressForm } from './AddressForm';
import ActionButton from '@/app/components/ui/ActionButton';
import { UpdateAddressForm } from './EditForm';

function AllAdressess() {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDailog, setShowEditDailog] = useState(false); 
    const [showAddDailog, setShowAddDailog] = useState(false)

    const handleEdit = () => {
        // Implement edit functionality
        console.log("Edit clicked");
      };
    
      const handleDelete = () => {
        setShowDeleteDialog(true);
      };
    
      const handleDeleteConfirm = () => {
        // Implement delete functionality
        console.log("Delete confirmed");
        setShowDeleteDialog(false);
      };
    
      const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
      };

    const handleAddAddress = () => {
        setShowAddDailog(true);
    };  

    const handleAddCancel = () => {
        setShowAddDailog(false);
    };
    const handleEditAddress = () => { 
        setShowEditDailog(true);
    }

    const handleEditClose = () => {
        setShowEditDailog(false);
    }



  return (
 <div className="bg-white flex flex-col items-start justify-start gap-2.5  font-normal  p-4 rounded-lg w-full min-h-screen   ">
    
 {!showAddDailog && !showEditDailog && <ActionButton onClick={handleAddAddress} variant='proceed'>Add Address +</ActionButton> }
 
    {
        !showEditDailog && !showAddDailog && (
            <div className="self-stretch min-w-60 w-full  ">
            <div className="bg-white flex flex-row gap-5 rounded-xl  max-md:px-5">
              <AddressCard
                title="US Home"
                name="Clark's Residence"
                address="67 east 26th streetb Paterson, NJ, 07514"
                country="United States (US)"
                phone="42412341234"
                email="salim124@gmail.com"
                onEdit={handleEditAddress}
                onDelete={handleDelete}
              />
              <AddressCard
                title="Office"
                name="Clark's Residence"
                address="67 east 26th streetb Paterson, NJ, 07514"
                country="United States (US)"
                phone="42412341234"
                email="salim124@gmail.com"
                onEdit={handleEditAddress}
                onDelete={handleDelete}
              />
    
            {showDeleteDialog && (
          <div className="absolute top-0 left-0 h-screen w-full bg-black/10 flex  items-center justify-center" >
                  <DeleteConfirmDialog
                    isVisible={showDeleteDialog}
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                  />
                </div>
              )}
            </div>
          </div>
        )
    }
    {
        showEditDailog && (
            <UpdateAddressForm
            cancelEdit={handleEditClose}
            />
        )
    }
    {
        showAddDailog && (
            <AddressForm   cancelAdd={handleAddCancel}/>
        )   
    }
    </div>
  )
}

export default AllAdressess