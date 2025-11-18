import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Eye, Download, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

interface Disclosure {
  id: number;
  director_name: string;
  din: string;
  disclosure_date: string;
  disclosure_type: string;
  file_path: string;
}

const DirectorsDisclosureDataSource = () => {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDisclosure, setSelectedDisclosure] = useState<Disclosure | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [disclosureContent, setDisclosureContent] = useState<string>("");
  const [loadingContent, setLoadingContent] = useState<boolean>(false);

  useEffect(() => {
    fetchDisclosures();
  }, []);

  const fetchDisclosures = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/directors-disclosures');
      
      if (!response.ok) {
        throw new Error('Failed to fetch disclosures');
      }
      
      const data = await response.json();
      setDisclosures(data.data || []);
    } catch (err) {
      console.error('Error fetching disclosures:', err);
      setError(err instanceof Error ? err.message : 'Failed to load disclosures');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDisclosure = async (disclosure: Disclosure) => {
    try {
      // The file_path from backend includes the filename
      const filename = disclosure.file_path.split('/').pop() || `${disclosure.director_name}_disclosure.docx`;
      const downloadUrl = `/api/directors-disclosures/${disclosure.id}/download`;
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading disclosure:', err);
    }
  };

  const handleViewDisclosure = async (disclosure: Disclosure) => {
    setSelectedDisclosure(disclosure);
    setIsModalOpen(true);
    setLoadingContent(true);
    
    try {
      const response = await fetch(`/api/directors-disclosures/${disclosure.id}/content`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch disclosure content');
      }
      
      const data = await response.json();
      setDisclosureContent(data.content || 'No content available');
    } catch (err) {
      console.error('Error fetching disclosure content:', err);
      setDisclosureContent('Error loading disclosure content');
    } finally {
      setLoadingContent(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#ffffff" }}>
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: "#75479C" }} />
          <p className="text-lg" style={{ color: "#000000" }}>Loading disclosures...</p>
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
          <Button
            onClick={fetchDisclosures}
            style={{
              backgroundColor: '#75479C',
              borderColor: '#75479C',
              color: 'white'
            }}
          >
            Retry
          </Button>
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
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8" style={{ color: "#75479C" }} />
              <div>
                <CardTitle className="text-2xl font-bold" style={{ color: "#000000" }}>
                  Directors' Disclosures
                </CardTitle>
                <CardDescription style={{ color: '#666666' }}>
                  Complete list of all disclosures made by directors
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                    <TableHead className="font-semibold">Director Name</TableHead>
                    <TableHead className="font-semibold">DIN</TableHead>
                    <TableHead className="font-semibold">Disclosure Date</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disclosures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8" style={{ color: '#666666' }}>
                        No disclosures found
                      </TableCell>
                    </TableRow>
                  ) : (
                    disclosures.map((disclosure) => (
                      <TableRow key={disclosure.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{disclosure.director_name}</TableCell>
                        <TableCell>{disclosure.din}</TableCell>
                        <TableCell>{disclosure.disclosure_date}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#f0e6f7', color: '#75479C' }}>
                            {disclosure.disclosure_type}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDisclosure(disclosure)}
                              className="gap-2"
                              style={{ borderColor: '#75479C', color: '#75479C' }}
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadDisclosure(disclosure)}
                              className="gap-2"
                              style={{ borderColor: '#0B74B0', color: '#0B74B0' }}
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Disclosure Content Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl" style={{ color: '#75479C' }}>
              <FileText className="h-6 w-6" />
              Disclosure Details
            </DialogTitle>
            {selectedDisclosure && (
              <DialogDescription style={{ color: '#666666' }}>
                {selectedDisclosure.director_name} (DIN: {selectedDisclosure.din}) - {selectedDisclosure.disclosure_date}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="mt-4">
            {loadingContent ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#75479C" }} />
              </div>
            ) : (
              <div className="prose max-w-none">
                <div className="p-6 rounded-lg border bg-white" style={{ whiteSpace: 'pre-wrap', color: '#000000' }}>
                  {disclosureContent}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setIsModalOpen(false)}
              style={{
                backgroundColor: '#75479C',
                borderColor: '#75479C',
                color: 'white'
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DirectorsDisclosureDataSource;
