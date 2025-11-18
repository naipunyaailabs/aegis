import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, Loader2, AlertCircle, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Director {
  id: number;
  name: string;
  din: string;
  created_at: string;
}

const DirectorsDisclosureMasterData = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [filteredDirectors, setFilteredDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  const [formData, setFormData] = useState({ name: "", din: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchDirectors();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDirectors(directors);
    } else {
      const filtered = directors.filter(
        (director) =>
          director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          director.din.includes(searchTerm)
      );
      setFilteredDirectors(filtered);
    }
  }, [searchTerm, directors]);

  const fetchDirectors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/directors-master');
      
      if (!response.ok) {
        throw new Error('Failed to fetch directors');
      }
      
      const data = await response.json();
      setDirectors(data.data || []);
      setFilteredDirectors(data.data || []);
    } catch (err) {
      console.error('Error fetching directors:', err);
      setError(err instanceof Error ? err.message : 'Failed to load directors');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDirector = async () => {
    if (!formData.name.trim() || !formData.din.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/directors-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to add director');

      await fetchDirectors();
      setIsAddDialogOpen(false);
      setFormData({ name: "", din: "" });
    } catch (err) {
      console.error('Error adding director:', err);
      alert('Failed to add director');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditDirector = async () => {
    if (!editingDirector || !formData.name.trim() || !formData.din.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`/api/directors-master/${editingDirector.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update director');

      await fetchDirectors();
      setIsEditDialogOpen(false);
      setEditingDirector(null);
      setFormData({ name: "", din: "" });
    } catch (err) {
      console.error('Error updating director:', err);
      alert('Failed to update director');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDirector = async (id: number) => {
    if (!confirm('Are you sure you want to delete this director?')) return;

    try {
      const response = await fetch(`/api/directors-master/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete director');

      await fetchDirectors();
    } catch (err) {
      console.error('Error deleting director:', err);
      alert('Failed to delete director');
    }
  };

  const openEditDialog = (director: Director) => {
    setEditingDirector(director);
    setFormData({ name: director.name, din: director.din });
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#ffffff" }}>
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: "#75479C" }} />
          <p className="text-lg" style={{ color: "#000000" }}>Loading directors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#ffffff" }}>
        <div className="text-center p-6 max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" style={{ color: "#EF4444" }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: "#000000" }}>Error Loading Data</h2>
          <p className="mb-4" style={{ color: "#000000" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: "#ffffff" }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg" style={{ borderTop: '4px solid #75479C' }}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8" style={{ color: "#75479C" }} />
              <div>
                <CardTitle className="text-2xl font-bold" style={{ color: "#000000" }}>
                  Directors Master Data
                </CardTitle>
                <CardDescription style={{ color: '#666666' }}>
                  Complete list of all directors with DIN information
                </CardDescription>
              </div>
            </div>

            {/* Search Bar and Add Button */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#666666' }} />
                <Input
                  placeholder="Search by name or DIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  style={{ borderColor: '#75479C' }}
                />
              </div>
              <Button
                onClick={() => {
                  setFormData({ name: "", din: "" });
                  setIsAddDialogOpen(true);
                }}
                className="gap-2"
                style={{ backgroundColor: '#75479C', color: 'white' }}
              >
                <Plus className="h-4 w-4" />
                Add Director
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm" style={{ color: '#666666' }}>
              Showing {filteredDirectors.length} of {directors.length} directors
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                    <TableHead className="font-semibold w-12">#</TableHead>
                    <TableHead className="font-semibold">Director Name</TableHead>
                    <TableHead className="font-semibold">DIN</TableHead>
                    <TableHead className="font-semibold">Added On</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDirectors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8" style={{ color: '#666666' }}>
                        {searchTerm ? 'No directors found matching your search' : 'No directors found'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDirectors.map((director, index) => (
                      <TableRow key={director.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium" style={{ color: '#666666' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">{director.name}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded text-xs font-mono bg-gray-100">
                            {director.din}
                          </span>
                        </TableCell>
                        <TableCell style={{ color: '#666666' }}>
                          {new Date(director.created_at).toLocaleDateString('en-IN')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(director)}
                              className="gap-1"
                              style={{ borderColor: '#0B74B0', color: '#0B74B0' }}
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteDirector(director.id)}
                              className="gap-1"
                              style={{ borderColor: '#BD3861', color: '#BD3861' }}
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card style={{ backgroundColor: '#f0e6f7', borderColor: '#75479C' }}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#75479C' }}>
                      {directors.length}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#666666' }}>
                      Total Directors
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: '#e5f4fb', borderColor: '#0B74B0' }}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#0B74B0' }}>
                      {filteredDirectors.length}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#666666' }}>
                      Filtered Results
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: '#fde8ee', borderColor: '#BD3861' }}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#BD3861' }}>
                      {new Set(directors.map(d => d.din)).size}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#666666' }}>
                      Unique DINs
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Director Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle style={{ color: '#75479C' }}>Add New Director</DialogTitle>
            <DialogDescription>
              Enter the details of the new director below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">Director Name *</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter director name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-din">DIN *</Label>
              <Input
                id="add-din"
                value={formData.din}
                onChange={(e) => setFormData(prev => ({ ...prev, din: e.target.value }))}
                placeholder="Enter DIN number"
                maxLength={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDirector}
              disabled={submitting}
              style={{ backgroundColor: '#75479C', color: 'white' }}
            >
              {submitting ? 'Adding...' : 'Add Director'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Director Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle style={{ color: '#0B74B0' }}>Edit Director</DialogTitle>
            <DialogDescription>
              Update the director's information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Director Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter director name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-din">DIN *</Label>
              <Input
                id="edit-din"
                value={formData.din}
                onChange={(e) => setFormData(prev => ({ ...prev, din: e.target.value }))}
                placeholder="Enter DIN number"
                maxLength={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditDirector}
              disabled={submitting}
              style={{ backgroundColor: '#0B74B0', color: 'white' }}
            >
              {submitting ? 'Updating...' : 'Update Director'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DirectorsDisclosureMasterData;
