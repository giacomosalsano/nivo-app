import { useContext, useEffect } from 'react'
import { EditFramePortal } from '../Portal/updateFramePortal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { FramesContext } from '../../Contexts/ContexProviders/framesContextProvider';
import { getAllFrames } from '../../core/modules/frames/service/getAllFrames';
import { Frame } from '../Interfaces/FrameInterface';


export function FramesTable() {

  const { frames, setFrames } = useContext(FramesContext);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const fetchedFrames: Frame[] = await getAllFrames({});
        setFrames(fetchedFrames);
      } catch (error) {
        console.error('Error fetching frames:', error);
      }
    };

    fetchFrames();
  }, [setFrames]);


  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Frame Name</TableHead>
            <TableHead>Frame Slug</TableHead>
            <TableHead>HTML Content</TableHead>
            <TableHead>Frame ID</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        {frames.map((frame)=> {
          return (
          <TableBody 
            key={frame.id}
            className='font-medium text-xs text-text-primary '>
            <TableRow>
                <TableCell className='font-medium text-xs text-text-primary'>{frame.firstName} {' '} {frame.lastName}</TableCell>
                  <TableCell className='font-medium text-xs text-text-primary'>
                      @{frame.frameNameSlug}
                  </TableCell>
                <TableCell className='font-medium text-xs text-text-primary'>{frame.htmlContent}</TableCell>
                  <TableCell className='font-medium text-xs text-text-primary'>
                      {frame.id}
                  </TableCell>
                <TableCell className='font-medium text-xs text-text-primary'>
                <EditFramePortal />
                </TableCell>
                
              </TableRow>
          </TableBody>
          )
        })}
      </Table>
    </div>
  )
}