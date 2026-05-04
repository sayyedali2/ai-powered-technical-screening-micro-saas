"use client"

import { 
  Box, TextField, Typography, InputAdornment, IconButton, 
  Dialog, DialogTitle, DialogContent, Container, Paper, 
  CircularProgress, Fade, Divider, Stack 
} from "@mui/material";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import QuizIcon from '@mui/icons-material/Quiz';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch('https://ai-powered-technical-screening-micro-saas.onrender.com/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: data.question })
      });

      const res = await response.json();
      setResponseData(res.message);
      setOpen(true);
      setLoading(false);
      reset();
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 3
    }}>
      
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2, justifyContent: 'center', alignItems: 'center' }}>
            <AutoAwesomeIcon sx={{ color: '#6366f1', fontSize: 32 }} />
            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 2, color: '#6366f1' }}>
              AI Powered Platform
            </Typography>
          </Stack>
          
          <Typography variant="h3" sx={{ 
            fontWeight: 800, 
            color: '#1e293b', 
            mb: 2,
            lineHeight: 1.2
          }}>
            Technical Screening <br /> 
            <span style={{ color: '#6366f1' }}>Made Simple.</span>
          </Typography>
        </Box>

        <Paper elevation={0} sx={{
          p: 2,
          borderRadius: 6,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid #fff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              placeholder="Paste the Job Description or Role requirements here..."
              fullWidth
              multiline
              minRows={4}
              {...register('question', { required: "Please provide context", maxLength: 500 })}
              error={!!errors.question}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '1.1rem',
                  color: '#334155',
                  '& fieldset': { border: 'none' },
                }
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" sx={{ alignSelf: 'flex-end', mb: 1 }}>
                      <IconButton 
                        type="submit"
                        disabled={loading}
                        sx={{ 
                          bgcolor: '#6366f1', 
                          color: '#fff',
                          width: 56,
                          height: 56,
                          '&:hover': { bgcolor: '#4f46e5', transform: 'scale(1.05)' },
                          '&.Mui-disabled': { bgcolor: '#e2e8f0' },
                          transition: 'all 0.2s'
                        }}
                      >
                        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : <SendIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </form>
        </Paper>
      </Container>

      {/* High Visibility Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        slots={{ transition: Fade }}
        slotProps={{
          paper: {
            sx: { borderRadius: 5, p: 1, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <QuizIcon sx={{ color: '#6366f1' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
            Interview Questions
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 16, top: 16, color: '#94a3b8' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Divider sx={{ mx: 3 }} />

        <DialogContent sx={{ p: 3 }}>
          {responseData && (
            <Stack spacing={2}>
              {JSON.parse(responseData).questions.map((q: string, index: number) => (
                <Box
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#fff', borderColor: '#6366f1', transform: 'translateY(-2px)' }
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 800, textTransform: 'uppercase' }}>
                    Question {index + 1}
                  </Typography>
                  <Typography sx={{ mt: 1, fontSize: '1.05rem', color: '#1e293b', lineHeight: 1.6, fontWeight: 500 }}>
                    {q}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}