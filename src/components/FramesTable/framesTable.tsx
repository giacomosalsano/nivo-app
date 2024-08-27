import { EditFramePortal } from '../Portal/editFramePortal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'


export function FramesTable() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Frame ID</TableHead>
            <TableHead>Frame Name</TableHead>
            <TableHead>HTML Content</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        {Frames.map((frame)=> {
          return (
          <TableBody 
            key={frame.htmlContent}
            className='font-medium text-xs text-text-primary '>
            <TableRow>
                  <TableCell className='font-medium text-xs text-text-primary'>
                      {frame.name.firstName} {' '} {frame.name.lastName}
                </TableCell>
                <TableCell className='font-medium text-xs text-text-primary'>{frame.htmlContent}</TableCell>
                <TableCell className='font-medium text-xs text-text-primary'>@{frame.frameNameSlug}</TableCell>
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